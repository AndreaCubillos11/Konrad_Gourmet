const express = require("express");
const router = express.Router();
const pedido=require("../controllers/pedidoControllers");
const auth = require("../middlewares/auth");

router.post("/pedido",auth.verificarToken, pedido.crearPedido);

module.exports = router;