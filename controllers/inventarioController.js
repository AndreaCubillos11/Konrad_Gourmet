// controllers/inventarioController.js
const InventarioProducto = require('../models/InventarioProducto');
const Inventario = require('../models/Inventario');
const Producto = require('../models/Producto');
const Unidad = require("../models/Unidad");
const Auditoria = require("../models/Auditoria");
const Usuario = require("../models/Usuario");
const Rol = require("../models/Rol");
const Sucursal = require("../models/Sucursales");
const CategoriaProducto = require('../models/CategoriaProducto');

exports.obtenerInventarioSucursal = async (req, res, next) => {
    try {
        const { id_sucursal } = req.params;
        const { creador_id } = req.query;

        // 1️⃣ Verificar que el usuario existe
        const usuario = await Usuario.findByPk(creador_id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const rol = await Rol.findByPk(usuario.id_rol);

        // 2️⃣ Validar rol y sucursal
        if (rol.nombre_rol.toLowerCase() !== 'jefe de cocina'.toLowerCase() ||
            usuario.id_sucursal !== parseInt(id_sucursal)) {
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
                        },
                        {
                            model: CategoriaProducto,
                            attributes: ["id_categoria", "nombre_categoria"]
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

exports.ObtenerInventarioTodaSucursales = async (req, res, next) => {
    try {
        const { creador_id } = req.query;

        // 1️⃣ Verificar que el usuario exista
        const usuario = await Usuario.findByPk(creador_id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // 2️⃣ Verificar rol del usuario
        const rol = await Rol.findByPk(usuario.id_rol);
        if (!rol || rol.nombre_rol.toLowerCase() !== 'administrador') {
            return res.status(403).json({ message: 'No tienes permisos para consultar el inventario de todas las sucursales.' });
        }

        // 3️⃣ Consultar todos los inventarios (todas las sucursales)
        const inventario = await InventarioProducto.findAll({
            include: [
                {
                    model: Inventario,
                    attributes: ['id_inventario', 'id_sucursal'],
                },
                {
                    model: Producto,
                    attributes: ["nombre"],
                    include: [
                        {
                            model: Unidad,
                            attributes: ["nombre_unidad"]
                        },
                        {
                            model: CategoriaProducto,
                            attributes: ["id_categoria", "nombre_categoria"]
                        }
                    ]
                }
            ],
            attributes: ['id_inventario_producto', 'cantidad_producto', 'stock_minimo', 'stock_maximo'],
            order: [
                [Inventario, 'id_sucursal', 'ASC'],
                ['id_inventario_producto', 'ASC']
            ]
        });

        if (!inventario.length) {
            return res.status(404).json({ message: 'No hay inventario registrado en ninguna sucursal.' });
        }

        // 4️⃣ Agrupar los resultados por sucursal
        const agrupadoPorSucursal = inventario.reduce((acc, item) => {
            const idSucursal = item.Inventario.id_sucursal;

            if (!acc[idSucursal]) {
                acc[idSucursal] = {
                    id_sucursal: idSucursal,
                    inventario: []
                };
            }

            acc[idSucursal].inventario.push({
                id_inventario_producto: item.id_inventario_producto,
                cantidad_producto: item.cantidad_producto,
                stock_minimo: item.stock_minimo,
                stock_maximo: item.stock_maximo,
                Producto: {
                    nombre: item.Producto.nombre,
                    Unidad: item.Producto.Unidad,
                    CategoriaProducto: item.Producto.CategoriaProducto
                }
            });

            return acc;
        }, {});

        // Convertir el objeto en un arreglo para la respuesta
        const resultado = Object.values(agrupadoPorSucursal);

        // 5️⃣ Registrar acción en auditoría
        await Auditoria.create({
            accion_registrada: 'Consulta de inventario de todas las sucursales (agrupado)',
            id_usuario: creador_id
        });

        // 6️⃣ Responder con los datos agrupados
        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};
