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

        const { id_categoriaProducto, cantidad, id_producto, id_sucursal,
            id_usuario, id_marca, id_unidadMedida } = req.body;


        // Validaciones básicas (que existan las FK)
        const catProducto = await CategoriaProducto.findByPk(id_categoriaProducto);
        if (!catProducto) return res.status(400).json({ error: "Categoria de producto no encontrado" });


        const producto = await Producto.findByPk(id_producto);
        if (!producto) return res.status(400).json({ error: "Producto no encontrado" });

        const sucursal = await Sucursal.findByPk(id_sucursal);
        if (!sucursal) return res.status(400).json({ error: "Sucursal no encontrada" });

        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) return res.status(400).json({ error: "Usuario no encontrado" });

        const rolCreador = await Rol.findOne({ where: { id_rol: usuario.id_rol } });

        if (rolCreador.nombre_rol.toLowerCase() !== "jefe de cocina") {
            return res.status(403).json({ error: "No autorizado" });
        }
        const unidadMedida = await UnidadMedida.findByPk(id_unidadMedida);
        if (!unidadMedida) return res.status(400).json({ error: "Unidad de medida no encontrado" });


        const estado = await EstadoSolicitud.findOne({
            where: {
                nombre_estado: {
                    [Op.iLike]: "pendiente" // 👈 ignora mayúsculas/minúsculas en PostgreSQL
                }
            }
        });



        // Crear la solicitud (la fecha la genera el servidor)
        const nuevaSolicitud = await SolicitudAlimento.create({
            cantidad,
            fecha_solicitud: new Date(), // ⬅️ Fecha del servidor
            id_producto,
            id_sucursal,
            id_usuario,
            id_estado: estado.id_estado,
            id_marca,
            id_categoria: id_categoriaProducto,
            id_unidad:id_unidadMedida
        });

        // Registrar en Auditoría
        await Auditoria.create({
            accion_registrada: `SOLICITUD DE ALIMENTOS DE LA SUCURSAL ${id_sucursal} , Solicitada por ${usuario.nombre}`,
            id_usuario: id_usuario
        });

        res.status(201).json({
            message: "Solicitud creada exitosamente",
            solicitud: nuevaSolicitud
        });

    } catch (err) {
        next(err);
    }

}// cierra crear solicitud 