const express = require("express");
const router = express.Router();
const sipsaService=require("../controllers/sipsa");
const auth = require("../middlewares/auth");


// ✅ Deja que Express invoque el controlador directamente
router.get("/promedios-ciudad",auth.verificarToken,sipsaService.obtenerPromediosCiudad);

module.exports = router;