const LogError = require("../models/LogError");
const Auditoria = require("../models/Auditoria");
const Usuario = require("../models/Usuario");

// Obtener todos los registros de LogError
exports.obtenerTodos = async (req, res, next) => {
    try {
        const { creador_id } = req.query;

        const errores = await LogError.findAll({
            attributes: ["id_error", "tipo_error", "descripcion", "fecha_hora"],
            order: [["fecha_hora", "DESC"]]
        });

        // Registrar acción en Auditoría
        await Auditoria.create({
            accion_registrada: "CONSULTA DE TODOS LOS REGISTROS DE LOGERROR",
            id_usuario: creador_id
        });

        res.status(200).json({
            mensaje: "Registros de LogError obtenidos con éxito",
            errores
        });
    } catch (err) {
        next(err);
    }
};

// Obtener un registro por ID
exports.obtenerPorId = async (req, res, next) => {
    try {
        const { id_error } = req.params;
        const { creador_id } = req.query;

        const logError = await LogError.findByPk(id_error, {
            attributes: ["id_error", "tipo_error", "descripcion", "fecha_hora"]
        });

        if (!logError) {
            return res.status(404).json({ error: "Registro de LogError no encontrado" });
        }

        // Registrar acción en Auditoría
        await Auditoria.create({
            accion_registrada: `CONSULTA DE LOGERROR ${id_error}`,
            id_usuario: creador_id
        });

        res.status(200).json({
            mensaje: "Registro de LogError consultado con éxito",
            logError
        });
    } catch (err) {
        next(err);
    }
};

// Eliminar todos los registros de LogError
exports.eliminarTodos = async (req, res, next) => {
    try {
        const { creador_id } = req.query;

        const cantidadEliminada = await LogError.destroy({ where: {}, truncate: true });

        // Registrar acción en Auditoría
        await Auditoria.create({
            accion_registrada: "ELIMINACIÓN DE TODOS LOS REGISTROS DE LOGERROR",
            id_usuario: creador_id
        });

        res.status(200).json({
            mensaje: "Todos los registros de LogError fueron eliminados correctamente",
            cantidadEliminada
        });
    } catch (err) {
        next(err);
    }
};
