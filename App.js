const express = require("express");
const sequelize = require("./config/database");
const usuarioRoutes = require("./routes/usuarioRoutes");
const errorLogger = require("./middlewares/errorLogger");
const sucursalesRoutes=require("./routes/sucursalesRouter");



const app = express();
app.use(express.json());

// Rutas
app.use("/api", usuarioRoutes);
app.use("/api",sucursalesRoutes);

// Middleware de errores
app.use(errorLogger);

// Conexión DB
sequelize.authenticate()
  .then(() => {
    console.log("Conexión establecida con PostgreSQL.");
    return sequelize.sync(); // Crea tablas si no existen
  })
  .then(() => {
    app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
  })
  .catch(err => console.error("Error al conectar DB:", err));
