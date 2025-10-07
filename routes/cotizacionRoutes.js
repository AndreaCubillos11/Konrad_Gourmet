const express = require("express");
const router = express.Router();
const cotizacionController = require("../controllers/cotizacionController");
const auth = require("../middlewares/auth");

router.post("/crear-cotizacion", auth.verificarToken,cotizacionController.crearCotizacion);
router.get("/consultar-cotizacion",auth.verificarToken, cotizacionController.consultarCotizaciones);

module.exports = router;