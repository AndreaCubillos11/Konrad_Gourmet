const express = require("express");
const router = express.Router();
const Plato =require("../controllers/platoControllers");
const auth = require("../middlewares/auth");

// POST: crear sucursal
router.post("/plato", auth.verificarToken, Plato.crearPlato);

module.exports = router;