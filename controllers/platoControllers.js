
const Plato = require("../models/Plato");
const PlatoProducto = require("../models/PlatoProducto");
const Auditoria = require("../models/Auditoria");

exports.crearPlato = async (req, res, next) => {
    

    try {
        const { nombre, precio_venta, id_categoria_plato, ingredientes,creador_id } = req.body;
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