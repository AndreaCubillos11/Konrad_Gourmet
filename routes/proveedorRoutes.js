const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedorController");
const auth = require("../middlewares/auth");

// Obtener todos los proveedores
router.get("/proveedores", auth.verificarToken, proveedorController.obtenerProveedores);

// Obtener un proveedor por ID
router.get("/proveedores/:id_proveedor", auth.verificarToken, proveedorController.obtenerProveedorPorId);

// Crear un nuevo proveedor
router.post("/proveedores", auth.verificarToken, proveedorController.crearProveedor);

// Actualizar un proveedor existente
router.put("/proveedores/:id_proveedor", auth.verificarToken, proveedorController.modificarProveedor);

// Eliminar un proveedor
router.delete("/proveedores/:id_proveedor", auth.verificarToken, proveedorController.eliminarProveedor);

module.exports = router;