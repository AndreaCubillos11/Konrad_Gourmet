const express = require("express");
const router = express.Router();
const Alertas=require("../controllers/alertas");
const auth = require("../middlewares/auth");


router.get("/consultar-alertas",auth.verificarToken, Alertas.ConsultarNotificacionesActivas);

module.exports = router;