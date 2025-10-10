const express = require("express");
const router = express.Router();
const { enviarCorreoConPDF } =require( "../controllers/emailController.js");
const multer = require("multer");


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
router.post("/enviar-pdf", upload.single("pdf"), enviarCorreoConPDF);

module.exports = router;
