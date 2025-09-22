// models/PedidoDetalle.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Pedido = require("./Pedido");
const Plato = require("./Plato");

const PedidoDetalle = sequelize.define("PedidoDetalle", {
    id_detalle: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "pedido",
            key: "id_pedido"
        }
    },
    id_plato: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "plato",
            key: "id_plato"
        }
    }
}, {
    tableName: "pedidodetalle",
    timestamps: false
});

// Relaciones
PedidoDetalle.belongsTo(Pedido, { foreignKey: "id_pedido" });
PedidoDetalle.belongsTo(Plato, { foreignKey: "id_plato" });

Pedido.hasMany(PedidoDetalle, { foreignKey: "id_pedido" });

module.exports = PedidoDetalle;
