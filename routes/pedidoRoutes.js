const express = require("express");
const router = express.Router();
const pedido=require("../controllers/pedidoControllers");

router.post("/pedido",pedido.crearPedido);

module.exports = router;