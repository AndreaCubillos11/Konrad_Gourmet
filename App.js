const express = require("express");
const sequelize = require("./config/database");
const usuarioRoutes = require("./routes/usuarioRoutes");
const errorLogger = require("./middlewares/errorLogger");
const sucursalesRoutes=require("./routes/sucursalesRouter");
const listasDesplegables=require("./routes/listasDesplegablesRouter");
const Plato=require("./routes/platoRouter");
const Pedido=require("./routes/pedidoRoutes");
const SolicitudAlimento=require("./routes/solicitudAlimentosRoutes");
const ProveedorRoutes=require("./routes/proveedorRoutes");

const app = express();
app.use(express.json());

// Rutas
app.use("/api",usuarioRoutes);
app.use("/api",sucursalesRoutes);
app.use("/api",listasDesplegables);
app.use("/api",Plato);
app.use("/api",Pedido);
app.use("/api",SolicitudAlimento);
app.use("/api",ProveedorRoutes);

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
