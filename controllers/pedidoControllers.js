const Pedido = require("../models/Pedido");
const PedidoDetalle = require("../models/PedidoDetalle");
const Auditoria = require("../models/Auditoria");
const Rol = require("../models/Rol");
const Usuario = require("../models/Usuario");


exports.crearPedido = async (req, res, next) => {
  try {
    const { numero_mesa, fecha_hora, id_sucursal, id_usuario, platos } = req.body;
    // platos = [{ id_plato, cantidad }, { id_plato, cantidad }]

    const usuario = await Usuario.findByPk(id_usuario
    );

    const rolCreador = await Rol.findOne({ where: { id_rol: usuario.id_rol } });
    
    if (rolCreador.nombre_rol !== "Mesero" && rolCreador.nombre_rol !== "mesero") {
      return res.status(403).json({ error: "No autorizado" });
    }

    // 1. Crear pedido
    const pedido = await Pedido.create({
      numero_mesa,
      fecha_hora,
      id_sucursal,
      id_usuario
    });

    // 2. Insertar los platos del pedido
    for (const p of platos) {
      await PedidoDetalle.create({
        cantidad: p.cantidad,
        id_pedido: pedido.id_pedido,
        id_plato: p.id_plato
      });
    }

    // 3. Registrar en auditoría
    await Auditoria.create({
      accion_registrada: `PEDIDO CREADO (ID: ${pedido.id_pedido})`,
      id_usuario: id_usuario
    });

    // 4. Respuesta
    res.status(201).json({
      mensaje: "Pedido registrado con éxito",
      pedido: {
        id_pedido: pedido.id_pedido,
        numero_mesa,
        fecha_hora,
        id_sucursal,
        id_usuario,
        platos
      }
    });
  } catch (err) {
    next(err);
  }
};
