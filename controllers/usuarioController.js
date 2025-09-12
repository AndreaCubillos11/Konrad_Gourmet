const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const Rol = require("../models/Rol");
const Auditoria = require("../models/Auditoria");

const SALT_ROUNDS = 10;

exports.crearUsuario = async (req, res, next) => {
    try {
        const { nombre, correo, contrasena, id_rol, creador_id } = req.body;

     
        
        const rolCreador = await Usuario.findOne({ where: { id_usuario: creador_id } });
        


        if (!rolCreador || rolCreador.id_rol !== 1) {
            return res.status(403).json({ error: "No autorizado" });
        }

        // Verificar duplicados
        const existe = await Usuario.findOne({ where: { correo } });
        if (existe) {
            return res.status(400).json({ error: "Usuario con ese correo ya existe" });
        }

        // Hash de contraseña
        const hash = await bcrypt.hash(contrasena, SALT_ROUNDS);

        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            contrasena: hash,
            id_rol
        });

        // Registrar en Auditoría
        await Auditoria.create({
            accion_registrada: "CREAR USUARIO",
            id_usuario: creador_id
        });

        res.status(201).json({ mensaje: "Usuario creado con éxito", usuario: nuevoUsuario });
    } catch (err) {
        next(err); // Middleware de logging captura el error
    }
};
