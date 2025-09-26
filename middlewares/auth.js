const jwt = require("jsonwebtoken");
const SECRET_KEY = "token_key"; //asignar despues la llave, la misma de usuarioController.js

exports.verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Token requerido" });
  }

  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }

    req.usuario = usuario;
    next();
  });
};