const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Cotizacion = require("./Cotizacion");

const EstadoCotizacion = sequelize.define("EstadoCotizacion", {
    id_estado: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_estado: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
}, {
    tableName: "estadocotizacion",
    timestamps: false
});

module.exports = EstadoCotizacion;