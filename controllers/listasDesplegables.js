const Usuario = require("../models/Usuario");
const Auditoria = require("../models/Auditoria");
const CategoriaPl = require("../models/CategoriaPlato");
const Categoria_Producto = require("../models/CategoriaProducto");
const { Where } = require("sequelize/lib/utils");
const CategoriaProducto = require("../models/CategoriaProducto");
const Producto = require("../models/Producto");
const { where } = require("sequelize");
const Marca = require("../models/Marca");
const Unidad = require("../models/Unidad");


exports.categoriaPlato = async (req, res, next) => {
    try {
        const { categoria_Plato, creador_id } = req.body;

        // Registrar categoría de plato
        if (categoria_Plato) {
            const existe = await CategoriaPl.findOne({ where: { nombre_categoria: categoria_Plato } });
            if (existe) {
                return res.status(400).json({ error: "Ya existe la categoría de plato" });
            }

            await CategoriaPl.create({ nombre_categoria: categoria_Plato });

            await Auditoria.create({
                accion_registrada: "CREAR CAT PLATO",
                id_usuario: creador_id
            });
        }

        res.status(200).json({ mensaje: "Lista alimentada correctamente." });

    } catch (err) {
        next(err);
    }
};

exports.CategoriaProducto = async (req, res, next) => {
    try {
        const { categoria_Producto, creador_id } = req.body;
        if (categoria_Producto) {
            const existeCategoria = await CategoriaProducto.findOne({ where: { nombre_categoria: categoria_Producto } });
            if (existeCategoria) {
                return res.status(400).json({ error: "Ya existe la categoría de producto" });
            }

            await CategoriaProducto.create({ nombre_categoria: categoria_Producto });

            await Auditoria.create({
                accion_registrada: "CREAR CATEGORIA PRODUCTO",
                id_usuario: creador_id
            });
        }
        res.status(200).json({ mensaje: "Lista alimentada correctamente." });

    } catch (err) {
        next(err);
    }
};

exports.UnidadMedida = async (req, res, next) => {
    try {
        const { unidad_Medida, creador_id } = req.body;

        // Registrar categoría de plato
        if (unidad_Medida) {
            const existe = await Unidad.findOne({ where: { nombre_unidad: unidad_Medida } });
            if (existe) {
                return res.status(400).json({ error: "Ya existe la unidad de medida" });
            }

            await Unidad.create({ nombre_unidad: unidad_Medida });

            await Auditoria.create({
                accion_registrada: "CREAR UNIDAD MEDIDA",
                id_usuario: creador_id
            });
        }
        res.status(200).json({ mensaje: "Lista alimentada correctamente." });

    } catch (err) {
        next(err);
    }
};

exports.Producto = async (req, res, next) => {

    try {
        const { nombre, id_unidad, id_categoria, id_marca, creador_id } = req.body;
        const existe = await Producto.findOne({ where: { nombre: nombre } });
        if (existe) {
            return res.status(400).json({ error: "Ya existe este producto" });
        }

        const nuevoProducto = await Producto.create({
            nombre,
            id_unidad,
            id_categoria,
            id_marca
        });

        await Auditoria.create({
            accion_registrada: "CREAR PRODUCTO",
            id_usuario: creador_id
        });
        res.status(200).json({ mensaje: "Lista alimentada correctamente." });

    } catch (err) {
        next(err);
    }
};

exports.ConsultarCategoriaPlato = async (req, res, next) => {
    try {
        const { creador_id } = req.query; // quién ejecuta la consulta

        const catPlatos = await CategoriaPl.findAll({
            attributes: ["id_categoria","nombre_categoria"]
        });

        // Registrar en auditoría
        if (creador_id) {
            await Auditoria.create({
                accion_registrada: "CONSULTAR LISTA CATEGORIA PLATOS",
                id_usuario: creador_id
            });
        }

        res.status(200).json({
            catPlatos
        });
    } catch (err) {
        next(err); // lo captura el middleware de errores
    }
};

exports.ConsultarCategoriaProducto=async(req,res,next)=>{
try {
    const { creador_id } = req.query; // quién ejecuta la consulta

    const catProductos = await CategoriaProducto.findAll({
      attributes: ["id_categoria","nombre_categoria"]
    });

    // Registrar en auditoría
    if (creador_id) {
      await Auditoria.create({
        accion_registrada: "CONSULTAR LISTA CATEGORIA PRODUCTOS",
        id_usuario: creador_id
      });
    }

    res.status(200).json({
      catProductos
    });
  } catch (err) {
    next(err); // lo captura el middleware de errores
  }
};

exports.ConsultarUnidad=async(req,res,next)=>{
    try {
    const { creador_id } = req.query; // quién ejecuta la consulta

    const catUnidad = await Unidad.findAll({
      attributes: ["id_unidad","nombre_unidad"]
    });

    // Registrar en auditoría
    if (creador_id) {
      await Auditoria.create({
        accion_registrada: "CONSULTAR LISTA CATEGORIA UNINADES DE MEDIDA",
        id_usuario: creador_id
      });
    }

    res.status(200).json({
      catUnidad
    });
  } catch (err) {
    next(err); // lo captura el middleware de errores
  }
};

exports.ConsultarProductos=async(req,res,next)=>{
    try {
    const { creador_id } = req.query; // quién ejecuta la consulta

    const productos = await Producto.findAll({
      attributes: ["nombre","id_unidad","id_categoria","id_marca"]
    });

    // Registrar en auditoría
    if (creador_id) {
      await Auditoria.create({
        accion_registrada: "CONSULTAR PRODUCTOS",
        id_usuario: creador_id
      });
    }

    res.status(200).json({
      productos
    });
  } catch (err) {
    next(err); // lo captura el middleware de errores
  }
};