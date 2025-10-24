// controllers/PromocionController.js
const { Op } = require("sequelize");
const Promocion = require("../models/Promocion");
const Producto = require("../models/Producto");
const Auditoria = require("../models/Auditoria");
const Usuario = require("../models/Usuario");
const Rol=require("../models/Rol");


exports.registrarPromocion = async (req, res, next) => {
    try {
        const { creador_id } = req.query;
        const { precio_promocional, fecha_inicio, fecha_fin, id_producto } = req.body;

        // ✅ Validación 1: Producto no nulo
        if (!id_producto) {
            return res.status(400).json({ mensaje: "El producto es obligatorio." });
        }

        // ✅ Validación 2: Precio válido
        if (!precio_promocional || isNaN(precio_promocional) || precio_promocional <= 0) {
            return res.status(400).json({ mensaje: "El precio promocional debe ser un valor numérico mayor que 0." });
        }

        // ✅ Validación 3: Fechas coherentes
        const inicio = new Date(fecha_inicio);
        const fin = new Date(fecha_fin);
        const hoy = new Date();

        if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
            return res.status(400).json({ mensaje: "Las fechas deben tener un formato válido." });
        }

        if (inicio < hoy) {
            return res.status(400).json({ mensaje: "La fecha de inicio no puede ser anterior a la fecha actual." });
        }

        if (fin <= inicio) {
            return res.status(400).json({ mensaje: "La fecha de fin debe ser posterior a la fecha de inicio." });
        }

        // ✅ Validación 4: Verificar que el producto exista
        const producto = await Producto.findByPk(id_producto);
        if (!producto) {
            return res.status(404).json({ mensaje: "El producto especificado no existe." });
        }

       // 1️⃣ Verificar que el usuario exista
        const usuario = await Usuario.findByPk(creador_id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // 2️⃣ Verificar rol del usuario
        const rol = await Rol.findByPk(usuario.id_rol);
        if (!rol || rol.nombre_rol.toLowerCase() !== 'director comercial') {
            return res.status(403).json({ message: 'No tienes permisos para crear Promociones.' });
        }


        // 1️⃣ Crear la promoción
        const nuevaPromocion = await Promocion.create({
            precio_promocional,
            fecha_inicio,
            fecha_fin,
            id_producto
        });

        // 2️⃣ Registrar auditoría
        if (creador_id) {
            await Auditoria.create({
                accion_registrada: `Promoción registrada para el producto ${producto.nombre}`,
                id_usuario: creador_id,
            });
        }

        // 3️⃣ Respuesta exitosa
        res.status(201).json({
            mensaje: "Promoción registrada con éxito",
            promocion: nuevaPromocion,
        });

    } catch (err) {
        next(err);
    }

};

exports.listarPromocionesVigentes = async (req, res, next) => {
    try {
        const { creador_id } = req.query;

        // ✅ Obtener fecha actual
        const hoy = new Date();

        // 1️⃣ Buscar promociones activas (fecha_actual entre inicio y fin)
        const promociones = await Promocion.findAll({
            where: {
                fecha_inicio: { [Op.lte]: hoy },
                fecha_fin: { [Op.gte]: hoy }
            },
            include: [
                {
                    model: Producto,
                    attributes: ["id_producto","nombre"]
                }
            ],
            order: [["fecha_inicio", "ASC"]]
        });

        // 2️⃣ Registrar auditoría
        if (creador_id) {
            await Auditoria.create({
                accion_registrada: "Consulta de promociones vigentes realizada",
                id_usuario: creador_id,
            });
        }

        // 3️⃣ Validar resultado
        if (promociones.length === 0) {
            return res.status(200).json({
                mensaje: "No hay promociones vigentes en este momento.",
                promociones: []
            });
        }

        // 4️⃣ Responder con los datos
        res.status(200).json({
            mensaje: "Promociones vigentes consultadas con éxito",
            total: promociones.length,
            promociones
        });

    } catch (err) {
        next(err);
    }
};
