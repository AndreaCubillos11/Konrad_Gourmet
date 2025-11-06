const { Op } = require("sequelize");
const CotizacionFactory = require("../factories/CotizacionFactory");
const Cotizacion = require("../models/Cotizacion");
const CotizacionDetalle = require("../models/CotizacionDetalle");
const EstadoCotizacion = require("../models/EstadoCotizacion");
const Auditoria = require("../models/Auditoria");
const SolicitudAlimento = require("../models/SolicitudAlimento");
const EstadoSolicitud = require("../models/EstadoSolicitud"); //asegúrate de tener este modelo
const Proveedor = require("../models/Proveedor");
const {SipsaAdapter} = require("../adapters/sipsaAdapter");

exports.crearCotizacion = async (req, res, next) => {
    try {
        const { creador_id } = req.query;
        const { id_solicitud, id_proveedor, fecha_maxima_resp } = req.body;

        // ✅ Validación 1: Proveedor no nulo
        if (!id_proveedor) {
            return res.status(400).json({ mensaje: "El proveedor es obligatorio." });
        }

        // ✅ Validación 2: Fecha coherente
        const fechaActual = new Date();
        const fechaMax = new Date(fecha_maxima_resp);

        if (isNaN(fechaMax.getTime()) || fechaMax <= fechaActual) {
            return res.status(400).json({
                mensaje: "La fecha máxima de respuesta debe ser una fecha válida y posterior a la fecha actual.",
            });
        }

        // 1️⃣ Crear cotización desde la solicitud (el Factory incluye validaciones internas)
        const { cotizacion, detalles } = await CotizacionFactory.crearDesdeSolicitud(req.body);

        // 2️⃣ Guardar cotización
        const nuevaCot = await Cotizacion.create(cotizacion);

        // 3️⃣ Guardar los detalles
        for (const d of detalles) {
            await CotizacionDetalle.create({
                ...d,
                id_cotizacion: nuevaCot.id_cotizacion,
            });
        }
        console.log("Linea 44" + id_solicitud);


        // 4️⃣ Actualizar estado de la solicitud a "EN TRÁMITE"
        const solicitud = await SolicitudAlimento.findByPk(id_solicitud);
        if (solicitud) {
            const estadoEnTramite = await EstadoSolicitud.findOne({
                where: { nombre_estado: { [Op.iLike]: "EN TRÁMITE" } },
            });

            if (estadoEnTramite) {
                solicitud.id_estado = estadoEnTramite.id_estado;
                await solicitud.save();
            }

            // Registrar auditoría del cambio de estado
            if (creador_id) {
                await Auditoria.create({
                    accion_registrada: `Solicitud ${solicitud.id_solicitud} actualizada a 'EN TRÁMITE'`,
                    id_usuario: creador_id,
                });
            }
        }

        // 5️⃣ Registrar auditoría general
        if (creador_id) {
            await Auditoria.create({
                accion_registrada: "Cotización Registrada",
                id_usuario: creador_id,
            });
        }

        res.status(201).json({
            mensaje: "Cotización creada con éxito",
            cotizacion: nuevaCot,
        });
    } catch (err) {
        next(err);
    }
};

exports.consultarCotizaciones = async (req, res, next) => {
    try {
        const { creador_id } = req.query;
        // 1 Buscar el id del estado "FINALIZADA" (ignorando mayúsculas/minúsculas/tildes)
        const estadoFinalizada = await EstadoCotizacion.findOne({
            where: {
                [Op.or]: [
                    { nombre_estado: { [Op.iLike]: "FINALIZADA" } },
                    { nombre_estado: { [Op.iLike]: "FINALIZADO" } }
                ]
            }
        });

        // 2️ Construir filtro: si se encontró el estado, lo excluimos
        const whereCondition = estadoFinalizada
            ? { id_estado: { [Op.ne]: estadoFinalizada.id_estado } } // distinto de “FINALIZADA”
            : {}; // si no existe el estado, no filtramos por id_estado

        // 3️⃣ Consultar las cotizaciones con sus relaciones
        const cotizaciones = await Cotizacion.findAll({
            where: whereCondition,
            include: [
                {
                    model: EstadoCotizacion,
                    attributes: ["id_estado", "nombre_estado"]
                },
                {
                    model: Proveedor,
                    attributes: ["id_proveedor", "nombre"]
                },
                {
                    model: SolicitudAlimento,
                    attributes: ["id_solicitud", "cantidad"]
                }
            ],
            order: [["id_cotizacion", "DESC"]]
        });


        await Auditoria.create({
            accion_registrada: "Consulta Cotizaciones",
            id_usuario: creador_id,
        });


        res.status(200).json({
            mensaje: "Cotizaciones consultadas con éxito",
            cotizaciones
        });

    } catch (error) {
        console.error("Error al consultar cotizaciones:", error);
        next(error);
    }
};


exports.actualizarValorCotizacion = async (req, res, next) => {
    try {
        const { creador_id } = req.query;
        const { id_cotizacion, nuevo_valor_unitario } = req.body;

        // Validaciones iniciales
        if (!id_cotizacion || !nuevo_valor_unitario) {
            return res.status(400).json({ mensaje: "Debe enviar id_cotizacion y nuevo_valor_unitario." });
        }

        // 1️⃣ Buscar la cotización
        const cotizacion = await Cotizacion.findByPk(id_cotizacion);
        if (!cotizacion) {
            return res.status(404).json({ mensaje: "Cotización no encontrada." });
        }

        // 2️⃣ Buscar su detalle (asumimos 1 producto por cotización)
        const detalle = await CotizacionDetalle.findOne({ where: { id_cotizacion } });
        if (!detalle) {
            return res.status(404).json({ mensaje: "Detalle de cotización no encontrado." });
        }

        // 3️⃣ Actualizar el precio unitario
        detalle.precio_unitario = nuevo_valor_unitario;
        await detalle.save();

        // 4️⃣ Consultar valor estándar SIPSA
        const sipsa = new SipsaAdapter();
        const sipsaResponse = await sipsa.getPromediosPorCiudad();

        const productosSipsa = Array.isArray(sipsaResponse.data)
            ? sipsaResponse.data
            : [sipsaResponse.data];

        // Buscar el nombre del producto (de tu modelo asociado o campo local)
        // Supongamos que el detalle tiene la relación o el nombre del producto
        const producto = await detalle.getProducto(); // <-- si tienes asociacion en Sequelize
        const nombreProducto = producto?.nombre || "Desconocido";
        

        const productoSipsa = productosSipsa.find((p) =>
            p.Nombre.toLowerCase().includes(nombreProducto.toLowerCase())
        );

        if (!productoSipsa) {
            return res.status(400).json({
                mensaje: `No se encontró el valor estándar en SIPSA para ${nombreProducto}.`,
            });
        }

        const valorMinisterio = parseFloat(productoSipsa.Precio);

        // 5️⃣ Calcular diferencia porcentual
        const diferencia = ((nuevo_valor_unitario - valorMinisterio) / valorMinisterio) * 100;

        let nuevoEstado = null;
        if (diferencia > 25) {
            nuevoEstado = "RECHAZADA";
        } else if (diferencia < -50) {
            nuevoEstado = "SOSPECHOSA";
        } else {
            nuevoEstado = "OPCIONADA";
        }

        // 6️⃣ Buscar el id_estado correspondiente
        const estado = await EstadoCotizacion.findOne({
            where: { nombre_estado: { [Op.iLike]: nuevoEstado } },
        });

        if (!estado) {
            return res.status(400).json({ mensaje: `El estado '${nuevoEstado}' no existe en la base de datos.` });
        }

        // 7️⃣ Actualizar el estado de la cotización
        cotizacion.id_estado = estado.id_estado;
        await cotizacion.save();

        // 8️⃣ Registrar auditoría
        if (creador_id) {
            await Auditoria.create({
                accion_registrada: `Cotización ${id_cotizacion} actualizada a '${nuevoEstado}' con valor ${nuevo_valor_unitario}`,
                id_usuario: creador_id,
            });
        }

        // 9️⃣ Responder
        res.status(200).json({
            mensaje: `Cotización actualizada y clasificada como '${nuevoEstado}'.`,
            cotizacion,
            detalle,
            valorMinisterio,
            diferencia: diferencia.toFixed(2) + "%",
        });

    } catch (err) {
        next(err);
    }
};

exports.consultarCotizacionesOpcionadas = async (req, res, next) => {
    try {
        const { creador_id } = req.query;

        // 1️⃣ Buscar el id del estado "OPCIONADA" (ignorando mayúsculas/minúsculas/tildes)
        const estadoOpcionada = await EstadoCotizacion.findOne({
            where: {
                nombre_estado: { [Op.iLike]: "OPCIONADA" }
            }
        });

        if (!estadoOpcionada) {
            return res.status(404).json({
                mensaje: 'No se encontró el estado "OPCIONADA"'
            });
        }

        // 2️⃣ Consultar las cotizaciones que estén en estado OPCIONADA
        const cotizaciones = await Cotizacion.findAll({
            where: { id_estado: estadoOpcionada.id_estado },
            include: [
                {
                    model: EstadoCotizacion,
                    attributes: ["id_estado", "nombre_estado"]
                },
                {
                    model: Proveedor,
                    attributes: ["id_proveedor", "nombre"]
                },
                {
                    model: SolicitudAlimento,
                    attributes: ["id_solicitud", "cantidad"]
                }
            ],
            order: [["id_cotizacion", "DESC"]]
        });

        // 3️⃣ Registrar en auditoría
        await Auditoria.create({
            accion_registrada: "Consulta Cotizaciones OPCIONADAS",
            id_usuario: creador_id,
        });

        res.status(200).json({
            mensaje: "Cotizaciones OPCIONADAS consultadas con éxito",
            cotizaciones
        });

    } catch (error) {
        next(error);
    }
};

