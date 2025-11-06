const express = require("express");
const router = express.Router();
const cotizacionController = require("../controllers/cotizacionController");
const auth = require("../middlewares/auth");

router.post("/crear-cotizacion", auth.verificarToken,cotizacionController.crearCotizacion);
router.get("/consultar-cotizacion",auth.verificarToken, cotizacionController.consultarCotizaciones);
router.post("/clasificar-cotizacion",auth.verificarToken,cotizacionController.actualizarValorCotizacion);
router.get("/cotizaciones-opcionadas",auth.verificarToken,cotizacionController.consultarCotizacionesOpcionadas);

module.exports = router;