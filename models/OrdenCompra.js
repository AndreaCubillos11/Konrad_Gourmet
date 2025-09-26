const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Proveedor = require("./Proveedor");

const OrdenCompra = sequelize.define("OrdenCompra", {
    id_orden: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Proveedor,
            key: "id_proveedor"
        }
    }
}, {
    tableName: "ordencompra",
    timestamps: false
});

// Relación
OrdenCompra.belongsTo(Proveedor, { foreignKey: "id_proveedor" });
Proveedor.hasMany(OrdenCompra, { foreignKey: "id_proveedor" });

module.exports = OrdenCompra;