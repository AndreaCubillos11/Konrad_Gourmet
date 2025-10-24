const express = require("express");
const router = express.Router();
const Inventario=require("../controllers/inventarioController");
const auth = require("../middlewares/auth");

router.get("/inventarios",auth.verificarToken,Inventario.ObtenerInventarioTodaSucursales);
router.get("/inventario/:id_sucursal",auth.verificarToken,Inventario.obtenerInventarioSucursal);




module.exports = router;