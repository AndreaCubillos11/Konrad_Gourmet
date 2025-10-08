// models/Sucursal.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // conexión configurada a la BD

const Sucursal = sequelize.define("Sucursal", {
  id_sucursal: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  direccion: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true   // 👈 asegura consistencia con la BD
  }
}, {
  tableName: "sucursal",
  timestamps: false
});

module.exports = Sucursal;