const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Rol = sequelize.define("Rol", {
  id_rol: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre_rol: { type: DataTypes.STRING(50), allowNull: false },
  descripcion: { type: DataTypes.STRING(150) }
}, {
  tableName: "Rol",
  timestamps: false
});

module.exports = Rol;
