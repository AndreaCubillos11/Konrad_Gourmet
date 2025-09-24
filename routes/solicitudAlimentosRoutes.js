const express = require("express");
const router = express.Router();
const SolicitudAlimento=require("../controllers/solicitudAlimentosControllers");

router.post("/solicitud", SolicitudAlimento.crearSolicitud);

module.exports = router;