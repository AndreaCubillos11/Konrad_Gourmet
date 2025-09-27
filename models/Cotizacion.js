const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Proveedor = require("./Proveedor");
const EstadoCotizacion = require("./EstadoCotizacion");

const Cotizacion = sequelize.define("Cotizacion", {
    id_cotizacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha_hora: {
        type: DataTypes.DATE,
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
    tableName: "cotizacion",
    timestamps: false
});

// Relación con Proveedor
Cotizacion.belongsTo(Proveedor, { foreignKey: "id_proveedor" });

Cotizacion.belongsTo(EstadoCotizacion, { foreignKey: "id_proveedor" });

module.exports = Cotizacion;