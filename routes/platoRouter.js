const express = require("express");
const router = express.Router();
const Plato =require("../controllers/platoControllers");
const auth = require("../middlewares/auth");


// POST: crear sucursal
router.post("/plato", auth.verificarToken, Plato.crearPlato);
router.get("/menu", auth.verificarToken, Plato.consultarMenu);
router.post("/plato/eliminar",auth.verificarToken,Plato.eliminarPlato);
router.get("/plato/:id_plato", auth.verificarToken,Plato.consultarPlato);

module.exports = router;