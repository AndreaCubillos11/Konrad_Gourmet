const { Server } = require("socket.io");

let io; // instancia global

function inicializarSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*", // 🔒 cambia a tu dominio frontend si quieres restringir
            methods: ["GET", "POST"]
        }
    });

    console.log("✅ Servidor WebSocket inicializado correctamente");

    // Manejo básico de conexión
    io.on("connection", (socket) => {
        console.log(`🔌 Cliente conectado: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`❌ Cliente desconectado: ${socket.id}`);
        });
    });

    // 🔙 Retorna la instancia
    return io;
}

// Permite emitir alertas desde cualquier parte del backend
function emitirAlerta(alerta) {
    if (io) {
        io.emit("nueva-alerta", alerta);
        console.log("📢 Alerta enviada a los clientes:", alerta);
    } else {
        console.warn("⚠️ No se ha inicializado el servidor de sockets aún");
    }
}

module.exports = { inicializarSocket, emitirAlerta };
