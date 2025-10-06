const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/auth"); // tu archivo auth.js

// Ruta de login (NO requiere token)
router.post("/login", usuarioController.login);


// Rutas que SÍ requieren token
router.post("/usuarios", auth.verificarToken, usuarioController.crearUsuario);
router.get("/usuarios", auth.verificarToken, usuarioController.obtenerUsuarios);
router.get("/usuarios/:id", auth.verificarToken, usuarioController.obtenerUsuarioPorId);
router.put("/usuarios/:id_usuario", auth.verificarToken, usuarioController.modificarUsuario);
router.get("/usuarios/rol",auth.verificarToken,usuarioController.consultarRoles);


module.exports = router;