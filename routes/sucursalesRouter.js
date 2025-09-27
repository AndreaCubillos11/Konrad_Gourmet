const express = require("express");
const router = express.Router();
const { crearSucursal,obtenerSucursales ,obtenerSucursalPorId} = require("../controllers/sucursalController");
const auth = require("../middlewares/auth");

// POST: crear sucursal
router.post("/sucursal", auth.verificarToken, crearSucursal);

// Consultar todas las sucursales
router.get("/sucursales", auth.verificarToken, obtenerSucursales);

router.get("/sucursales/:id_sucursal", auth. verificarToken, obtenerSucursalPorId);

module.exports = router;