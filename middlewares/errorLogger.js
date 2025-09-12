const LogError = require("../models/LogError");

async function errorLogger(err, req, res, next) {
  console.error(err);

  await LogError.create({
    tipo_error: err.name || "ErrorInterno",
    descripcion: err.message,
  });

  res.status(500).json({ error: "Ocurrió un error en el servidor" });
}

module.exports = errorLogger;
