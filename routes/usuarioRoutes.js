const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");


// Consultar todos los usuarios
router.get("/usuarios", usuarioController.obtenerUsuarios);

// Consultar un usuario por id
router.get("/usuarios/:id", usuarioController.obtenerUsuarioPorId);


router.post("/usuarios", usuarioController.crearUsuario);

router.put("/usuarios/:id_usuario",usuarioController.modificarUsuario);

module.exports = router;
