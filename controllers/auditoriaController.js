const Auditoria = require("../models/Auditoria");
const Usuario = require("../models/Usuario");

// Obtener todas las auditorías
exports.obtenerAuditorias = async (req, res, next) => {
    try {
        const { creador_id } = req.query;

        const rolCreador = await Usuario.findOne({ where: { id_usuario: creador_id } });
        if (!rolCreador || rolCreador.id_rol !== 1) {
            return res.status(403).json({ error: "No autorizado" });
        }
        const auditorias = await Auditoria.findAll({
            attributes: ["id_auditoria", "accion_registrada", "fecha_hora"],
            include: {
                model: Usuario,
                attributes: ["id_usuario", "nombre", "id_sucursal"]
            },
            order: [["fecha_hora", "DESC"]]
        });

        await Auditoria.create({
            accion_registrada: `CONSULTA DE TRAZABILIDAD`,
            id_usuario: creador_id
        });

        res.status(200).json({
            mensaje: "Auditorías consultadas con éxito",
            auditorias
        });
    } catch (err) {
        next(err);
    }
};

// Obtener auditoría por ID
exports.obtenerAuditoriaPorId = async (req, res, next) => {
    try {
        const { id_auditoria } = req.params;
        const { creador_id } = req.query;

        const rolCreador = await Usuario.findOne({ where: { id_usuario: creador_id } });
        if (!rolCreador || rolCreador.id_rol !== 1) {
            return res.status(403).json({ error: "No autorizado" });
        }

        const auditoria = await Auditoria.findByPk(id_auditoria, {
            attributes: ["id_auditoria", "accion_registrada", "fecha_hora"],
            include: {
                model: Usuario,
                attributes: ["id_usuario", "nombre", "id_sucursal"]
            }
        });

        if (!auditoria) {
            return res.status(404).json({ error: "Auditoría no encontrada" });
        }

        await Auditoria.create({
            accion_registrada: `CONSULTA DE TRAZABILIDAD ${id_auditoria}`,
            id_usuario: creador_id
        });

        res.status(200).json({
            mensaje: "Auditoría consultada con éxito",
            auditoria
        });
    } catch (err) {
        next(err);
    }
};


