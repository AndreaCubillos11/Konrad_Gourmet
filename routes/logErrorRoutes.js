const express = require("express");
const router = express.Router();
const logErrorController = require("../controllers/logErrorController");
const auth = require("../middlewares/auth");


router.get("/error", auth.verificarToken,logErrorController.obtenerTodos);
router.get("/error/:id_error", auth.verificarToken,logErrorController.obtenerPorId);
router.delete("/error",auth.verificarToken, logErrorController.eliminarTodos);

module.exports = router;
