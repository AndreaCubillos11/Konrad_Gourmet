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

// GET: consultar todos los usuarios
exports.obtenerUsuarios = async (req, res, next) => {
  try {
    const { creador_id } = req.query; // quién ejecuta la consulta

    const usuarios = await Usuario.findAll({
      attributes: ["id_usuario","nombre", "correo", "id_rol"],
      include: {
        model: Rol,
        attributes: ["nombre_rol"]
      }
    });

    // Registrar en auditoría
    if (creador_id) {
      await Auditoria.create({
        accion_registrada: "CONSULTAR USUARIOS",
        id_usuario: creador_id
      });
    }

    res.status(200).json({
      mensaje: "Usuarios consultados con éxito",
      usuarios
    });
  } catch (err) {
    next(err); // lo captura el middleware de errores
  }
};

// GET: consultar un usuario por id
exports.obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { creador_id } = req.query;

    const usuario = await Usuario.findByPk(id, {
      attributes: [ "id_usuario","nombre", "correo", "id_rol"],
      include: {
        model: Rol,
        attributes: ["nombre_rol"]
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Registrar en auditoría
    if (creador_id) {
      await Auditoria.create({
        accion_registrada: `CONSULTAR USUARIO ${id}`,
        id_usuario: creador_id
      });
    }

    res.status(200).json({
      mensaje: "Usuario consultado con éxito",
      usuario
    });
  } catch (err) {
    next(err);
  }
};

exports.modificarUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params; // usuario a modificar
        const { nombre, correo, contrasena, id_rol, modificador_id } = req.body;

        // Validar que el modificador tenga rol administrador
        const rolModificador = await Usuario.findOne({ where: { id_usuario: modificador_id } });
        if (!rolModificador || rolModificador.id_rol !== 1) {
            return res.status(403).json({ error: "No autorizado" });
        }

        // Buscar usuario a modificar
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Validar duplicado de correo (si lo envían actualizado)
        if (correo && correo !== usuario.correo) {
            const existe = await Usuario.findOne({ where: { correo } });
            if (existe) {
                return res.status(400).json({ error: "Correo ya está en uso por otro usuario" });
            }
        }

        // Preparar campos actualizados
        const datosActualizados = {};
        if (nombre) datosActualizados.nombre = nombre;
        if (correo) datosActualizados.correo = correo;
        if (id_rol) datosActualizados.id_rol = id_rol;
        if (contrasena) {
            const hash = await bcrypt.hash(contrasena, SALT_ROUNDS);
            datosActualizados.contrasena = hash;
        }

        // Actualizar usuario
        await usuario.update(datosActualizados);

        // Registrar en Auditoría
        await Auditoria.create({
            accion_registrada: "MODIFICAR USUARIO:"+id_usuario,
            id_usuario: modificador_id
        });

        res.status(200).json({ mensaje: "Usuario modificado con éxito", usuario });
    } catch (err) {
        next(err);
    }
};
