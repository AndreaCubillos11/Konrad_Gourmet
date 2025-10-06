const express = require("express");
const router = express.Router();
const pedido=require("../controllers/pedidoControllers");
const auth = require("../middlewares/auth");

router.post("/pedido",auth.verificarToken, pedido.crearPedido);

router.get("/pedido/activos/:id_sucursal",auth.verificarToken, pedido.consultarPedidosActivosPorSucursal);

router.put("/pedido/:id_pedido/estado",auth.verificarToken, pedido.actualizarEstadoPedido);



module.exports = router;