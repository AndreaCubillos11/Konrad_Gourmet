const express = require("express");
const router = express.Router();
const SolicitudAlimento=require("../controllers/solicitudAlimentosControllers");
const auth = require("../middlewares/auth");

router.post("/solicitud", auth.verificarToken, SolicitudAlimento.crearSolicitud);

router.get("/solicitud",auth.verificarToken,SolicitudAlimento.consultarSolicitudesActivas);

router.get("/solicitud/:id_sucursal",auth.verificarToken,SolicitudAlimento.consultarSolicitudesPorSucursal);

module.exports = router;