const { Op } = require("sequelize");
const CotizacionFactory = require("../factories/CotizacionFactory");
const Cotizacion = require("../models/Cotizacion");
const CotizacionDetalle = require("../models/CotizacionDetalle");
const EstadoCotizacion = require("../models/EstadoCotizacion");
const Auditoria = require("../models/Auditoria");
const SolicitudAlimento = require("../models/SolicitudAlimento");
const EstadoSolicitud = require("../models/EstadoSolicitud"); //asegúrate de tener este modelo
const Proveedor = require("../models/Proveedor");

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
                console.log("Linea 44"+id_solicitud);


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
