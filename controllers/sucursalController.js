const Sucursal = require("../models/Sucursales");
const Usuario = require("../models/Usuario");
const Auditoria = require("../models/Auditoria");

// Crear una sucursal
exports.crearSucursal = async (req, res, next) => {
  try {
    const { nombre, direccion, telefono, id_usuario, creador_id } = req.body;

    // Verificar permisos -> solo admin (ej: rol 1)
    const creador = await Usuario.findOne({ where: { id_usuario: creador_id } });
    console.log(creador);

    if (!creador || creador.id_rol !== 1) {
      return res.status(403).json({ error: "No autorizado para crear sucursal" });
    }

    // Verificar duplicados
    const existe = await Sucursal.findOne({ 
      where: { nombre } 
    });

    if (existe) {
      return res.status(400).json({ error: "Ya existe una sucursal con ese nombre" });
    }

    // Crear sucursal
    const nuevaSucursal = await Sucursal.create({
      nombre,
      direccion,
      telefono,
      id_usuario
    });

    // Registrar en auditoría
    await Auditoria.create({
      accion_registrada: "CREAR SUCURSAL",
      id_usuario: creador_id
    });

    res.status(201).json({
      mensaje: "Sucursal creada con éxito",
      sucursal: nuevaSucursal
    });
  } catch (err) {
    next(err); // middleware de errores captura
  }
};

exports.obtenerSucursales = async (req, res, next) => {
  try {
    const { creador_id } = req.query; 
    // lo recibimos por query param o lo que uses como "usuario que consulta"

    const sucursales = await Sucursal.findAll({
      include: {
        model: Usuario,
        attributes: ["id_usuario", "nombre", "correo"]
      }
    });

    // Registrar en auditoría que alguien consultó las sucursales
    if (creador_id) {
      await Auditoria.create({
        accion_registrada: "CONSULTAR SUCURSALES",
        id_usuario: creador_id
      });
    }

    res.status(200).json({
      mensaje: "Sucursales consultadas con éxito",
      sucursales
    });
  } catch (err) {
    next(err);
  }
};
