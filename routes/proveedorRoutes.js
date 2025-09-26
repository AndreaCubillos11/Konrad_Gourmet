const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedorController");

// Obtener todos los proveedores
router.get("/proveedores", proveedorController.obtenerProveedores);

// Obtener un proveedor por ID
router.get("/proveedores/:id_proveedor", proveedorController.obtenerProveedorPorId);

// Crear un nuevo proveedor
router.post("/proveedores", proveedorController.crearProveedor);

// Actualizar un proveedor existente
router.put("/proveedores/:id_proveedor", proveedorController.modificarProveedor);

// Eliminar un proveedor
router.delete("/proveedores/:id_proveedor", proveedorController.eliminarProveedor);

module.exports = router;