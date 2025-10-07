// controllers/inventarioController.js
const InventarioProducto = require('../models/InventarioProducto');
const Inventario = require('../models/Inventario');
const Producto = require('../models/Producto');
const Unidad = require("../models/Unidad");
const Auditoria = require("../models/Auditoria");
const Usuario = require("../models/Usuario");
const Rol = require("../models/Rol");
const Sucursal = require("../models/Sucursales");

exports.obtenerInventarioSucursal = async (req, res, next) => {
    try {
        const { id_sucursal } = req.params;
        const { creador_id } = req.query;

        // 1️⃣ Verificar que el usuario existe
        const usuario = await Usuario.findByPk(creador_id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const sucursal = await Sucursal.findOne({
            where: { id_usuario: usuario.id_usuario },
        });


        const rol = await Rol.findByPk(usuario.id_rol);

        // 2️⃣ Validar rol y sucursal
        if (rol.nombre_rol.toLowerCase() !== 'jefe de cocina'.toLowerCase() ||
            sucursal.id_sucursal !== parseInt(id_sucursal)) {
            return res.status(403).json({ message: 'No tienes permisos para acceder a este inventario.' });
        }

        // 3️⃣ Obtener productos del inventario
        const inventario = await InventarioProducto.findAll({
            include: [
                {
                    model: Inventario,
                    where: { id_sucursal: id_sucursal },
                    attributes: ['id_inventario', 'id_sucursal'],
                },
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
            ],
            attributes: ['id_inventario_producto', 'cantidad_producto', 'stock_minimo', 'stock_maximo'],
            order: [['id_inventario_producto', 'ASC']],
        });

        if (!inventario.length) {
            return res.status(404).json({ message: 'No hay inventario para esta sucursal.' });
        }

        // 4️⃣ Registrar en Auditoría
        await Auditoria.create({
            accion_registrada: `Consulta de inventario de la sucursal ${id_sucursal}`,
            id_usuario: creador_id
        });

        res.json(inventario);
    } catch (err) {
        next(err);
    }
};
