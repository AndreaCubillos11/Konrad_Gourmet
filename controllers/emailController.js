import nodemailer from "nodemailer";
import fs from "fs";

const EMAIL_USER = "andreavalentinacubillospinto@gmail.com";
const EMAIL_PASS = "sranadtazfffwyma"; // usa token de app si es Gmail

export const enviarCorreoConPDF = async (req, res) => {
    try {
        const { emailDestino, asunto, mensaje } = req.body;
        const filePath = req.file.path;

        // Configurar transporte
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });

        // Configurar el correo
        const mailOptions = {
            from: `"Sistema de Cotizaciones" <${EMAIL_USER}>`,
            to: emailDestino || "destinatario@correo.com",
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

        // Borrar archivo temporal
        fs.unlinkSync(filePath);

        res.json({ mensaje: "📩 Correo enviado con PDF adjunto correctamente" });

    } catch (error) {
        console.error("❌ Error al enviar correo:", error);
        res.status(500).json({
            error: "Error al enviar correo",
            detalle: error.message
        });
    }
};
