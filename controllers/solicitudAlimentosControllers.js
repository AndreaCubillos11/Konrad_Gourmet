const { Op } = require("sequelize");
const Auditoria = require("../models/Auditoria");
const Rol = require("../models/Rol");
const Usuario = require("../models/Usuario");
const SolicitudAlimento = require("../models/SolicitudAlimento");
const EstadoSolicitud = require("../models/EstadoSolicitud");
const CategoriaProducto = require("../models/CategoriaProducto");
const Marca = require("../models/Marca");
const Producto = require("../models/Producto");
const Sucursal = require("../models/Sucursales");
const UnidadMedida = require("../models/Unidad");

exports.crearSolicitud = async (req, res, next) => {
    try {
        const {
            id_categoriaProducto,
            cantidad,
            id_producto,
            id_sucursal,
            id_usuario,
            id_marca,
            id_unidadMedida
        } = req.body;

        // Validar que la cantidad exista y sea > 0
        if (cantidad === undefined || cantidad === null) {
            return res.status(400).json({ error: "El campo 'cantidad' es obligatorio" });
        }

        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).json({ error: "La cantidad debe ser un número mayor que 0" });
        }

        // Validaciones básicas (que existan las FK)
        const catProducto = await CategoriaProducto.findByPk(id_categoriaProducto);
        if (!catProducto)
            return res.status(400).json({ error: "Categoría de producto no encontrada" });

        const producto = await Producto.findByPk(id_producto);
        if (!producto)
            return res.status(400).json({ error: "Producto no encontrado" });

        const sucursal = await Sucursal.findByPk(id_sucursal);
        if (!sucursal)
            return res.status(400).json({ error: "Sucursal no encontrada" });

        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario)
            return res.status(400).json({ error: "Usuario no encontrado" });

        const rolCreador = await Rol.findOne({ where: { id_rol: usuario.id_rol } });
        if (rolCreador.nombre_rol.toLowerCase() !== "jefe de cocina") {
            return res.status(403).json({ error: "No autorizado" });
        }

        const unidadMedida = await UnidadMedida.findByPk(id_unidadMedida);
        if (!unidadMedida)
            return res.status(400).json({ error: "Unidad de medida no encontrada" });

        const estado = await EstadoSolicitud.findOne({
            where: {
                nombre_estado: {
                    [Op.iLike]: "pendiente" // ignora mayúsculas/minúsculas
                }
            }
        });

        // Crear la solicitud
        const nuevaSolicitud = await SolicitudAlimento.create({
            cantidad,
            fecha_solicitud: new Date(),
            id_producto,
            id_sucursal,
            id_usuario,
            id_estado: estado.id_estado,
            id_marca,
            id_categoria: id_categoriaProducto,
            id_unidad: id_unidadMedida
        });

        // Registrar en Auditoría
        await Auditoria.create({
            accion_registrada: `SOLICITUD DE ALIMENTOS DE LA SUCURSAL ${id_sucursal}, solicitada por ${usuario.nombre}`,
            id_usuario: id_usuario
        });

        res.status(201).json({
            message: "Solicitud creada exitosamente",
            solicitud: nuevaSolicitud
        });

    } catch (err) {
        next(err);
    }
};


exports.consultarSolicitudesActivas = async (req, res, next) => {

    const { creador_id } = req.query;
    try {
        const solicitudes = await SolicitudAlimento.findAll({
            include: [
                { model: Producto, attributes: ["nombre"] },
                { model: Sucursal, attributes: ["nombre"] },
                { model: Usuario, attributes: ["nombre"] },
                { model: EstadoSolicitud, attributes: ["nombre_estado"] },
                { model: UnidadMedida, attributes: ["nombre_unidad"] },
                { model: CategoriaProducto, attributes: ["nombre_categoria"] },
                { model: Marca, attributes: ["nombre_marca"] }
            ],
            where: {
                "$EstadoSolicitud.nombre_estado$": {
                    [Op.notILike]: "finalizada"
                }
            }
        });

        // Registrar en Auditoría
        await Auditoria.create({
            accion_registrada: `Consulta de las solicitudes de alientos activas`,
            id_usuario: creador_id
        });

        res.status(200).json({
            message: "Solicitudes activas consultadas exitosamente",
            solicitudes
        });

    } catch (err) {
        next(err);
    }
};

exports.consultarSolicitudesPorSucursal = async (req, res, next) => {
    try {
        const { creador_id } = req.query;
        const { id_sucursal } = req.params;

        const sucursal = await Sucursal.findByPk(id_sucursal);
        if (!sucursal) {
            return res.status(404).json({ error: "Sucursal no encontrada" });
        }

        const solicitudes = await SolicitudAlimento.findAll({
            include: [
                { model: Producto, attributes: ["nombre"] },
                { model: Usuario, attributes: ["nombre"] },
                { model: EstadoSolicitud, attributes: ["nombre_estado"] },
                { model: UnidadMedida, attributes: ["nombre_unidad"] },
                { model: CategoriaProducto, attributes: ["nombre_categoria"] },
                { model: Marca, attributes: ["nombre_marca"] },
            ],
            where: {
                id_sucursal,
                "$EstadoSolicitud.nombre_estado$": {
                    [Op.notILike]: "finalizada" // filtra por estado distinto a Finalizada
                }
            }
        });

        // Registrar en Auditoría
        await Auditoria.create({
            accion_registrada: `Consulta de las solicitudes de alientos activas en la sucursal: ${id_sucursal}`,
            id_usuario: creador_id
        });
        res.status(200).json({
            message: `Solicitudes de la sucursal ${sucursal.nombre_sucursal}`,
            solicitudes
        });

    } catch (err) {
        next(err);
    }
};

