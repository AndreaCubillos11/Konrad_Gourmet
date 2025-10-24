const express = require("express");
const router = express.Router();
const sipsaService=require("../controllers/sipsa");



// ✅ Deja que Express invoque el controlador directamente
router.get("/promedios-ciudad", sipsaService.obtenerPromediosCiudad);

module.exports = router;