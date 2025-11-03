import nodemailer from "nodemailer";
import fs from "fs";

const EMAIL_USER = "andreavalentinacubillospinto@gmail.com";
const EMAIL_PASS = "sranadtazfffwyma"; // Usa token de aplicación si es Gmail

export const enviarCorreoConPDF = async (req, res) => {
    try {
        const { emailDestino, asunto, mensaje } = req.body;
        const filePath = req.file.path;

        // ✅ Asegúrate de definir esta variable ANTES de usarla
        const destinatarios = emailDestino
            ? emailDestino.split(",").map(correo => correo.trim())
            : ["destinatario@correo.com"];

        // Configurar transporte
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });

        // Configurar correo
        const mailOptions = {
            from: `"Sistema de Cotizaciones" <${EMAIL_USER}>`,
            to: destinatarios, // 👈 Aquí usamos la variable ya definida
            subject: asunto || "Solicitud de Cotización",
            text: mensaje || "Adjunto encontrarás el archivo PDF solicitado.",
            attachments: [
                {
                    filename: req.file.originalname,
                    path: filePath
                }
            ]
        };

        // Enviar correo
        await transporter.sendMail(mailOptions);

        // Eliminar archivo temporal
        fs.unlinkSync(filePath);

        res.json({ mensaje: "📩 Correo enviado con PDF adjunto a todos los destinatarios correctamente" });

    } catch (error) {
        console.error("❌ Error al enviar correo:", error);
        res.status(500).json({
            error: "Error al enviar correo",
            detalle: error.message
        });
    }
};

export const enviarCorreoSinAdjunto = async (req, res) => {
    try {
        const { emailDestino, asunto, mensaje } = req.body;

        // ✅ Procesar destinatarios (pueden ser varios separados por coma)
        const destinatarios = emailDestino
            ? emailDestino.split(",").map(correo => correo.trim())
            : ["destinatario@correo.com"];

        // Configurar transporte
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });

        // Configurar correo SIN adjunto
        const mailOptions = {
            from: `"Sistema de Cotizaciones" <${EMAIL_USER}>`,
            to: destinatarios,
            subject: asunto || "Notificación del sistema",
            text: mensaje || "Este es un mensaje enviado desde el sistema."
        };

        // Enviar correo
        await transporter.sendMail(mailOptions);

        res.json({ mensaje: "📩 Correo enviado correctamente a todos los destinatarios" });

    } catch (error) {
        console.error("❌ Error al enviar correo:", error);
        res.status(500).json({
            error: "Error al enviar correo",
            detalle: error.message
        });
    }
};