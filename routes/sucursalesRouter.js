const express = require("express");
const router = express.Router();
const { crearSucursal,obtenerSucursales } = require("../controllers/sucursalController");


// POST: crear sucursal
router.post("/sucursal", crearSucursal);

// Consultar todas las sucursales
router.get("/sucursales", obtenerSucursales);

module.exports = router;
