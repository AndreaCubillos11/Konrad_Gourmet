const express = require("express");
const router = express.Router();
const auditoriaController = require("../controllers/auditoriaController");
const auth = require("../middlewares/auth");

router.get("/auditoria",auth.verificarToken, auditoriaController.obtenerAuditorias);
router.get("/auditoria/:id_auditoria", auth.verificarToken,auditoriaController.obtenerAuditoriaPorId);


module.exports = router;
