const Proveedor = require("../models/Proveedor");
const Auditoria = require("../models/Auditoria");

// Crear proveedor
exports.crearProveedor = async (req, res, next) => {
  try {
    const { nombre, direccion, telefono, correo,ciudad, creador_id } = req.body;

    // Validar duplicado por correo
    if (correo) {
      const existe = await Proveedor.findOne({ where: { correo } });
      if (existe) {
        return res.status(400).json({ error: "Ya existe un proveedor con ese correo" });
      }
    }

    const nuevoProveedor = await Proveedor.create({
      nombre,
      direccion,
      telefono,
      correo,
      ciudad
    });

    // Auditoría
    if (creador_id) {
      await Auditoria.create({
        accion_registrada: "CREAR PROVEEDOR",
        id_usuario: creador_id
      });
    }

    res.status(201).json({
      mensaje: "Proveedor creado con éxito",
      proveedor: nuevoProveedor
    });
  } catch (err) {
    next(err);
  }
};

// Obtener todos los proveedores
exports.obtenerProveedores = async (req, res, next) => {
  try {
    const { creador_id } = req.query;

    const proveedores = await Proveedor.findAll({
      attributes: ["id_proveedor", "nombre", "direccion", "telefono", "correo","ciudad"]
    });

    if (creador_id) {
      await Auditoria.create({
        accion_registrada: "CONSULTAR PROVEEDORES",
        id_usuario: creador_id
      });
    }

    res.status(200).json({
      mensaje: "Proveedores consultados con éxito",
      proveedores
    });
  } catch (err) {
    next(err);
  }
};

// Obtener proveedor por ID
exports.obtenerProveedorPorId = async (req, res, next) => {
  try {
    const { id_proveedor } = req.params;
    const { creador_id } = req.query;

    const proveedor = await Proveedor.findByPk(id_proveedor, {
      attributes: ["id_proveedor", "nombre", "direccion", "telefono", "correo","ciudad"]
    });

    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }

    if (creador_id) {
      await Auditoria.create({
        accion_registrada: `CONSULTAR PROVEEDOR ${id_proveedor}`,
        id_usuario: creador_id
      });
    }

    res.status(200).json({
      mensaje: "Proveedor consultado con éxito",
      proveedor
    });
  } catch (err) {
    next(err);
  }
};

// Modificar proveedor
exports.modificarProveedor = async (req, res, next) => {
  try {
    const { id_proveedor } = req.params;
    const { nombre, direccion, telefono, correo, modificador_id ,ciudad} = req.body;

    const proveedor = await Proveedor.findByPk(id_proveedor);
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }

    // Validar correo duplicado
    if (correo && correo !== proveedor.correo) {
      const existe = await Proveedor.findOne({ where: { correo } });
      if (existe) {
        return res.status(400).json({ error: "El correo ya está en uso por otro proveedor" });
      }
    }

    const datosActualizados = {};
    if (nombre) datosActualizados.nombre = nombre;
    if (direccion) datosActualizados.direccion = direccion;
    if (telefono) datosActualizados.telefono = telefono;
    if (correo) datosActualizados.correo = correo;
    if(ciudad) datosActualizados.ciudad=ciudad;

    await proveedor.update(datosActualizados);

    if (modificador_id) {
      await Auditoria.create({
        accion_registrada: `MODIFICAR PROVEEDOR ${id_proveedor}`,
        id_usuario: modificador_id
      });
    }

    res.status(200).json({
      mensaje: "Proveedor modificado con éxito",
      proveedor
    });
  } catch (err) {
    next(err);
  }
};

// Eliminar proveedor
exports.eliminarProveedor = async (req, res, next) => {
  try {
    const { id_proveedor } = req.params;
    const { eliminador_id } = req.body;

    const proveedor = await Proveedor.findByPk(id_proveedor);
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }

    await proveedor.destroy();

    if (eliminador_id) {
      await Auditoria.create({
        accion_registrada: `ELIMINAR PROVEEDOR ${id_proveedor}`,
        id_usuario: eliminador_id
      });
    }

    res.status(200).json({ mensaje: "Proveedor eliminado con éxito" });
  } catch (err) {
    next(err);
  }
};