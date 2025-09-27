const express = require("express");
const router = express.Router();
const SolicitudAlimento=require("../controllers/solicitudAlimentosControllers");
const auth = require("../middlewares/auth");

router.post("/solicitud", auth.verificarToken, SolicitudAlimento.crearSolicitud);

module.exports = router;