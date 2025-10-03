
const Plato = require("../models/Plato");
const PlatoProducto = require("../models/PlatoProducto");
const Auditoria = require("../models/Auditoria");
const Producto = require("../models/Producto");
const Unidad = require("../models/Unidad");
const CategoriaPlato = require("../models/CategoriaPlato");
const PedidoDetalle=require("../models/PedidoDetalle");

exports.crearPlato = async (req, res, next) => {


    try {
        const { nombre, precio_venta, id_categoria_plato, ingredientes, creador_id } = req.body;
        // ingredientes = [{ id_producto, cantidad }, { id_producto, cantidad }]
        // Crear plato
        const plato = await Plato.create({
            nombre,
            precio_venta,
            id_categoria: id_categoria_plato
        });

        // Insertar productos relacionados
        for (const ing of ingredientes) {
            await PlatoProducto.create({
                cantidad: ing.cantidad,
                id_plato: plato.id_plato,
                id_producto: ing.id_producto
            });
        }

        // Registrar en auditoría
        await Auditoria.create({
            accion_registrada: "PLATO CREADO",
            id_usuario: creador_id
        });


        res.status(201).json({
            mensaje: "Plato registrado con éxito"
        });
    } catch (err) {
        next(err);
    }
};

exports.consultarMenu = async (req, res, next) => {
    try {
        const { creador_id } = req.query;
        const platos = await Plato.findAll({
            attributes: ["id_plato", "nombre", "precio_venta"],
            include: [
                {
                    model: PlatoProducto,
                    attributes: ["id_producto", "cantidad"],
                    include: [
                        {
                            model: Producto,
                            attributes: ["nombre"],
                            include: [
                                {
                                    model: Unidad,  // <-- anidado aquí dentro de Producto
                                    attributes: ["nombre_unidad"]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: CategoriaPlato,  // <-- asociado directamente con Plato
                    attributes: ["id_categoria", "nombre_categoria"]
                }
            ]
        });


        // Registrar en auditoría
        if (creador_id) {
            await Auditoria.create({
                accion_registrada: "CONSULTAR MENU",
                id_usuario: creador_id
            });
        }

        res.status(200).json({ mensaje: "Menú consultado con éxito", platos });
    } catch (err) {
        next(err);
    }
};

exports.eliminarPlato = async (req, res, next) => {
    try {
        const { id_plato, eliminador_id } = req.body;

        // Verificar si existe el plato
        const plato = await Plato.findByPk(id_plato);
        if (!plato) {
            return res.status(404).json({ mensaje: "Plato no encontrado" });
        }

        const existeEnPedido = await PedidoDetalle.findOne({ where: { id_plato } });
        if (existeEnPedido) {
            return res.status(400).json({
                mensaje: "No se puede eliminar, el plato cuenta con pedidos en alguna Sucursal"
            });
        }

        // Eliminar relaciones en PlatoProducto
        await PlatoProducto.destroy({
            where: { id_plato }
        });

        // Eliminar el plato
        await Plato.destroy({
            where: { id_plato }
        });

        // Registrar en auditoría
        await Auditoria.create({
            accion_registrada: "PLATO ELIMINADO",
            id_usuario: eliminador_id
        });

        res.status(200).json({
            mensaje: "Plato eliminado con éxito"
        });
    } catch (err) {
        next(err);
    }
};

exports.consultarPlato = async (req, res, next) => {
    try {
        const { id_plato } = req.params;   //  viene desde la URL
        const { creador_id } = req.query;  //  opcional, lo puedes seguir mandando en query (?creador_id=2)

        const plato = await Plato.findOne({
            where: { id_plato },
            attributes: ["id_plato", "nombre", "precio_venta"],
            include: [
                {
                    model: PlatoProducto,
                    attributes: ["id_producto", "cantidad"],
                    include: [
                        {
                            model: Producto,
                            attributes: ["nombre"],
                            include: [
                                {
                                    model: Unidad,
                                    attributes: ["nombre_unidad"]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: CategoriaPlato,
                    attributes: ["id_categoria", "nombre_categoria"]
                }
            ]
        });

        if (!plato) {
            return res.status(404).json({ mensaje: "Plato no encontrado" });
        }

        // Registrar en auditoría
        if (creador_id) {
            await Auditoria.create({
                accion_registrada: "CONSULTAR PLATO",
                id_usuario: creador_id
            });
        }

        res.status(200).json({
            mensaje: "Plato consultado con éxito",
            plato
        });
    } catch (err) {
        next(err);
    }
};


