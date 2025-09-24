// models/EstadoSolicitud.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EstadoSolicitud = sequelize.define("EstadoSolicitud", {
  id_estado: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_estado: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  }
}, {
  tableName: "estadosolicitud",
  timestamps: false
});

module.exports = EstadoSolicitud;
