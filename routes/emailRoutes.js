const express = require("express");
const router = express.Router();
const { enviarCorreoConPDF ,enviarCorreoSinAdjunto} =require( "../controllers/emailController.js");
const multer = require("multer");
const auth = require("../middlewares/auth");

// Configuración de almacenamiento temporal
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Ruta: POST /api/email/enviar-pdf
router.post("/enviar-pdf", upload.single("pdf"),auth.verificarToken, enviarCorreoConPDF);

// ✅ Ruta para enviar correo sin adjunto
// Ejemplo de uso: POST /api/email/enviar
router.post("/enviar",auth.verificarToken, enviarCorreoSinAdjunto);

module.exports = router;
