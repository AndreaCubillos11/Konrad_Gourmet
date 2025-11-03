const express = require("express");
const http = require("http");
const cors = require("cors");
const { Client } = require("pg"); // Para escuchar NOTIFY
const sequelize = require("./config/database");
const { inicializarSocket } = require("./socket"); // 👈 Import correcto

// Inicialización de Express
const app = express();
app.use(cors());
app.use(express.json());

// Crear servidor HTTP y asociar WebSocket
const server = http.createServer(app);
const io = inicializarSocket(server); // 👈 Inicializa el WebSocket

// Escuchar conexiones de sockets
io.on("connection", (socket) => {
  console.log(`🔌 Cliente conectado: ${socket.id}`);
  socket.on("disconnect", () => console.log(`❌ Cliente desconectado: ${socket.id}`));
});

// 🧠 Conexión PG nativa (para escuchar NOTIFY del SP)
const pgClient = new Client({
  user: "postgres",
  host: "localhost",
  database: "Konrad_Gourmet",
  password: "1234",
  port: 5432,
});

pgClient.connect()
  .then(() => {
    console.log("✅ Conectado a PostgreSQL (canal de alertas)");
    pgClient.query("LISTEN alertas"); // 👂 Escucha canal 'alertas'
  })
  .catch(err => console.error("❌ Error conexión pgClient:", err));

// Cuando llega una notificación desde PostgreSQL:
pgClient.on("notification", (msg) => {
  console.log("📢 Nueva alerta recibida desde PostgreSQL:", msg.payload);

  // Emitir evento a todos los clientes conectados
  io.emit("nueva-alerta", {
    mensaje: "Nueva alerta generada desde SP",
    data: msg.payload ? JSON.parse(msg.payload) : null
  });
});

// --- Tus rutas ---
const usuarioRoutes = require("./routes/usuarioRoutes");
const sucursalesRoutes = require("./routes/sucursalesRouter");
const listasDesplegables = require("./routes/listasDesplegablesRouter");
const Plato = require("./routes/platoRouter");
const Pedido = require("./routes/pedidoRoutes");
const SolicitudAlimento = require("./routes/solicitudAlimentosRoutes");
const ProveedorRoutes = require("./routes/proveedorRoutes");
const InventarioRoutes = require("./routes/inventarioRoutes");
const CotizacionRoutes = require("./routes/cotizacionRoutes");
const emailRoutes = require("./routes/emailRoutes.js");
const alertas = require("./routes/alertasRoutes.js");
const sipsa = require("./routes/sipsaRoutes.js");
const promocionRoutes = require("./routes/promocionRoutes");
const errorLogger = require("./middlewares/errorLogger");

// Registrar rutas
app.use("/api", usuarioRoutes);
app.use("/api", sucursalesRoutes);
app.use("/api", listasDesplegables);
app.use("/api", Plato);
app.use("/api", Pedido);
app.use("/api", SolicitudAlimento);
app.use("/api", ProveedorRoutes);
app.use("/api", InventarioRoutes);
app.use("/api", CotizacionRoutes);
app.use("/api/email", emailRoutes);
app.use("/api", alertas);
app.use("/api", sipsa);
app.use("/api", promocionRoutes);
app.use(errorLogger);

// Conexión Sequelize y levantamiento del servidor
sequelize.authenticate()
  .then(() => {
    console.log("✅ Conexión establecida con Sequelize y PostgreSQL.");
    return sequelize.sync();
  })
  .then(() => {
    const PORT = 3000;
    server.listen(PORT, () => console.log(`🚀 Servidor activo en http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ Error al conectar DB:", err));
