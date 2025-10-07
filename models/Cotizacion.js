const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Proveedor = require("./Proveedor");
const EstadoCotizacion = require("./EstadoCotizacion");
const SolicitudAlimento=require("./SolicitudAlimento");

const Cotizacion = sequelize.define("Cotizacion", {
    id_cotizacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha_maxima_resp: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "proveedor",
            key: "id_proveedor"
        }
    },
    id_solicitud: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "solicitudalimento",
            key: "id_solicitud"
        }
    },
        id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "estadocotizacion",
            key: "id_estado"
        }
    }

}, {
    tableName: "cotizacion",
    timestamps: false
});

// Relación con Proveedor
Cotizacion.belongsTo(Proveedor, { foreignKey: "id_proveedor" });

Cotizacion.belongsTo(EstadoCotizacion, { foreignKey: "id_estado" });

Cotizacion.belongsTo(SolicitudAlimento,{foreignKey: "id_solicitud" })

module.exports = Cotizacion;