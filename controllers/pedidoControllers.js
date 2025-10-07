const Pedido = require("../models/Pedido");
const PedidoDetalle = require("../models/PedidoDetalle");
const Auditoria = require("../models/Auditoria");
const Rol = require("../models/Rol");
const Usuario = require("../models/Usuario");
const sequelize = require("../config/database"); // ✅ Importa tu Singleton

exports.crearPedido = async (req, res, next) => {
  const t = await sequelize.transaction(); // ✅ Ya no será undefined
  try {
    const { numero_mesa, fecha_hora, id_sucursal, id_usuario, platos } = req.body;

    const usuario = await Usuario.findByPk(id_usuario);
    const rolCreador = await Rol.findOne({ where: { id_rol: usuario.id_rol } });

    if (rolCreador.nombre_rol.toLowerCase() !== "mesero") {
      await t.rollback();
      return res.status(403).json({ error: "No autorizado" });
    }

    const pedido = await Pedido.create(
      { numero_mesa, fecha_hora, id_sucursal, id_usuario },
      { transaction: t }
    );

    for (const p of platos) {
      await PedidoDetalle.create(
        { cantidad: p.cantidad, id_pedido: pedido.id_pedido, id_plato: p.id_plato },
        { transaction: t }
      );
    }

    await Auditoria.create(
      { accion_registrada: `PEDIDO CREADO (ID: ${pedido.id_pedido})`, id_usuario },
      { transaction: t }
    );

    // ✅ Llamada al procedimiento almacenado
    await sequelize.query("CALL public.procesar_pedido(:idPedido)", {
      replacements: { idPedido: pedido.id_pedido },
      transaction: t,
    });

    await t.commit();

    res.status(201).json({
      mensaje: "Pedido registrado y procesado con éxito ✅",
      pedido,
    });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.consultarPedidosActivosPorSucursal = async (req, res, next) => {
  try {
    const { id_sucursal } = req.params;
    const { creador_id } = req.query;

    // Validar parámetro
    if (!id_sucursal) {
      return res.status(400).json({ error: "Falta el parámetro id_sucursal" });
    }

    // Consultar pedidos en estado true (activos) y filtrados por sucursal
    const pedidos = await Pedido.findAll({

      where: {
        estado: true,
        id_sucursal: id_sucursal
      },
      include: [
        {
          model: PedidoDetalle,
          attributes: ["id_plato", "cantidad"],
        },
        {
          model: Usuario,
          attributes: ["id_usuario", "nombre"],
        },
      ],
      order: [["fecha_hora", "DESC"]],
    });

    if (!pedidos.length) {
      return res.status(404).json({ mensaje: "No hay pedidos activos para esta sucursal." });
    }

    // Registrar en Auditoría
    await Auditoria.create({
      accion_registrada: `Consulta de pedidos en la sucursal: ${id_sucursal}`,
      id_usuario: creador_id
    });

    res.status(200).json({
      mensaje: "Pedidos activos consultados correctamente.",
      pedidos,
    });
  } catch (err) {
    next(err);
  }
};

exports.actualizarEstadoPedido = async (req, res, next) => {
  try {
    const { id_pedido } = req.params;
    const { estado, creador_id } = req.body;

    // Validaciones básicas
    if (!id_pedido) {
      return res.status(400).json({ error: "Falta el parámetro id_pedido." });
    }

    if (estado === undefined || typeof estado !== "boolean") {
      return res.status(400).json({ error: "El campo 'estado' debe ser true o false." });
    }

    // Buscar pedido
    const pedido = await Pedido.findByPk(id_pedido);

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    // Actualizar solo el campo estado
    pedido.estado = estado;
    await pedido.save();

    // Registrar en Auditoría
    await Auditoria.create({
       accion_registrada: `PEDIDO ACTUALIZADO (ID: ${id_pedido}) - Estado cambiado a ${estado}`,
      id_usuario: creador_id
    });


    res.status(200).json({
      mensaje: "Estado del pedido actualizado correctamente.",
      pedido,
    });
  } catch (err) {
    next(err);
  }
};


