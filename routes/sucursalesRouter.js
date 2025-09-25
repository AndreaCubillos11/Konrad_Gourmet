const express = require("express");
const router = express.Router();
const { crearSucursal,obtenerSucursales ,obtenerSucursalPorId} = require("../controllers/sucursalController");


// POST: crear sucursal
router.post("/sucursal", crearSucursal);

// Consultar todas las sucursales
router.get("/sucursales", obtenerSucursales);

router.get("/sucursales/:id_sucursal", obtenerSucursalPorId);

module.exports = router;
