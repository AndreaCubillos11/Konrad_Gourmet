const express = require("express");
const router = express.Router();
const PromocionController = require("../controllers/PromocionController");
const auth = require("../middlewares/auth");

router.post("/promocion-registrar", auth.verificarToken,PromocionController.registrarPromocion);
router.get("/promocion-vigentes", auth.verificarToken,PromocionController.listarPromocionesVigentes);

module.exports = router;