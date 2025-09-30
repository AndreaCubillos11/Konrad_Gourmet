const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Proveedor = require("./Proveedor");
const Cotizacion=require("./Cotizacion");

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
id_cotizacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "cotizacion",
            key: "id_cotizacion"
        }
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "proveedor",
            key: "id_proveedor"
        }
    }
}, {
    tableName: "ordencompra",
    timestamps: false
});

// Relación
OrdenCompra.belongsTo(Proveedor,{ foreignKey: "id_proveedor" });
OrdenCompra.belongsTo(Cotizacion,{ foreignKey: "id_cotizacion"});


module.exports = OrdenCompra;