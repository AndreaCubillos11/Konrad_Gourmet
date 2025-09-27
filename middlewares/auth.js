const jwt = require("jsonwebtoken");
// auth.js
const crypto = require("crypto");

// Genera una clave aleatoria segura (256 bits = 32 bytes)
const SECRET_KEY = crypto.randomBytes(32).toString("hex");

module.exports = { SECRET_KEY };

exports.verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("verificando token...")
  if (!token) {
    return res.status(403).json({ error: "Token requerido" });
  }

  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) {
      // Pasamos el error a errorLogger
      return next(err);
    }
    req.usuario = usuario;
    next();
  });
};