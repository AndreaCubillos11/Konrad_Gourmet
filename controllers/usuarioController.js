const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const Rol = require("../models/Rol");
const Auditoria = require("../models/Auditoria");

const { SECRET_KEY } = require("../middlewares/auth");

const SALT_ROUNDS = 10;

// POST: crear usuario
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

    // Auditoría
    await Auditoria.create({
      accion_registrada: "CREAR USUARIO",
      id_usuario: creador_id
    });

    res.status(201).json({
      mensaje: "Usuario creado con éxito",
      usuario: {
        id_usuario: nuevoUsuario.id_usuario,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        id_rol: nuevoUsuario.id_rol
      }
    });
  } catch (err) {
    next(err);
  }
};

// POST: login y generar token
exports.login = async (req, res, next) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const match = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!match) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, correo: usuario.correo, id_rol: usuario.id_rol },
      SECRET_KEY,
      { expiresIn: "8h" } // caduca en 8 horas
    );

    // Auditoría
    await Auditoria.create({
      accion_registrada: "LOGIN USUARIO",
      id_usuario: usuario.id_usuario
    });

    res.status(200).json({
      mensaje: "Login exitoso",
      token,
      usuario
    });
  } catch (err) {
    next(err);
  }
};

// GET: consultar todos los usuarios
exports.obtenerUsuarios = async (req, res, next) => {
  try {
    const { creador_id } = req.query;

    const usuarios = await Usuario.findAll({
      attributes: ["id_usuario", "nombre", "correo", "id_rol","estado"],
      include: {
        model: Rol,
        attributes: ["nombre_rol"]
      }
    });

    if (creador_id) {
      await Auditoria.create({
        accion_registrada: "CONSULTAR USUARIOS",
        id_usuario: creador_id
      });
    }

    res.status(200).json({ mensaje: "Usuarios consultados con éxito", usuarios });
  } catch (err) {
    next(err);
  }
};

// GET: consultar usuario por id
exports.obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { creador_id } = req.query;

    const usuario = await Usuario.findByPk(id, {
      attributes: ["id_usuario", "nombre", "correo", "id_rol","estado"],
      include: {
        model: Rol,
        attributes: ["nombre_rol"]
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (creador_id) {
      await Auditoria.create({
        accion_registrada: `CONSULTAR USUARIO ${id}`,
        id_usuario: creador_id
      });
    }

    res.status(200).json({ mensaje: "Usuario consultado con éxito", usuario });
  } catch (err) {
    next(err);
  }
};

// PUT: modificar usuario
exports.modificarUsuario = async (req, res, next) => {
  try {
    const { id_usuario } = req.params;
    const { nombre, correo, contrasena, id_rol, modificador_id, estado } = req.body;

    const rolModificador = await Usuario.findOne({ where: { id_usuario: modificador_id } });
    if (!rolModificador || rolModificador.id_rol !== 1) {
      return res.status(403).json({ error: "No autorizado" });
    }

    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (correo && correo !== usuario.correo) {
      const existe = await Usuario.findOne({ where: { correo } });
      if (existe) {
        return res.status(400).json({ error: "Correo ya está en uso por otro usuario" });
      }
    }

    const datosActualizados = {};
    if (nombre) datosActualizados.nombre = nombre;
    if (correo) datosActualizados.correo = correo;
    if (id_rol) datosActualizados.id_rol = id_rol;
    if (contrasena) {
      const hash = await bcrypt.hash(contrasena, SALT_ROUNDS);
      datosActualizados.contrasena = hash;
    }
    if (estado) datosActualizados.estado = estado;

    await usuario.update(datosActualizados);

    await Auditoria.create({
      accion_registrada: "MODIFICAR USUARIO:" + id_usuario,
      id_usuario: modificador_id
    });

    res.status(200).json({ mensaje: "Usuario modificado con éxito", usuario });
  } catch (err) {
    next(err);
  }
};

exports.consultarRoles=async(req,res,next)=>{
  try {
    const { creador_id } = req.query;

    const roles = await Rol.findAll({
      attributes: [ "id_rol","nombre_rol"]
    });


      await Auditoria.create({
        accion_registrada: "CONSULTAR ROLES",
        id_usuario: creador_id
      });
    

    res.status(200).json({ mensaje: "Roles del sistema", roles });
  } catch (err) {
    next(err);
  }
};
