const express = require("express");
const router = express.Router();
const PromocionController = require("../controllers/PromocionController");

router.post("/promocion-registrar", PromocionController.registrarPromocion);
router.get("/promocion-vigentes", PromocionController.listarPromocionesVigentes);

module.exports = router;