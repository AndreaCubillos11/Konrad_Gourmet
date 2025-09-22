const express = require("express");
const router = express.Router();
const Plato =require("../controllers/platoControllers");


// POST: crear sucursal
router.post("/plato", Plato.crearPlato);

module.exports = router;