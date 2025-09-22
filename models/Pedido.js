// models/Pedido.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Sucursal = require("./Sucursales");
const Usuario = require("./Usuario");

const Pedido = sequelize.define("Pedido", {
    id_pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numero_mesa: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fecha_hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "sucursal",
            key: "id_sucursal"
        }
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuario",
            key: "id_usuario"
        }
    }
}, {
    tableName: "pedido",
    timestamps: false
});

// Relaciones
Pedido.belongsTo(Sucursal, { foreignKey: "id_sucursal" });
Pedido.belongsTo(Usuario, { foreignKey: "id_usuario" });

module.exports = Pedido;
