const { Op } = require("sequelize");
const Auditoria = require("../models/Auditoria");
const Alertas = require("../models/alertastock");
const InventarioProducto = require("../models/InventarioProducto");
const Producto = require("../models/Producto");
const Sucursal = require("../models/Sucursales");

exports.ConsultarNotificacionesActivas = async (req, res, next) => {
    try {
        const { creador_id } = req.query;
        const alertas = await Alertas.findAll({
            include: [
                {
                    model: InventarioProducto, attributes: ["cantidad_producto", "stock_maximo", "stock_minimo"],
                    include: [

                        { model: Producto, attributes: ["id_producto", "nombre"] }
                    ]
                },
                { model: Sucursal, attributes: ["nombre"] }
            ],
            where: {
                estado: {
                    [Op.notILike]: "finalizada"
                }
            }
        });

        // Registrar en Auditoría
        await Auditoria.create({
            accion_registrada: `Notificaciones Consultadas`,
            id_usuario: creador_id
        });

        res.status(200).json({
            message: "Alertas consultadas exitosamente",
            alertas
        });

    } catch (error) {
        next(error);
    }
};