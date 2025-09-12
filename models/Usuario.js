const { DataTypes } = require("sequelize"); 
const sequelize = require("../config/database");
const Rol = require("./Rol");



const Usuario = sequelize.define("Usuario", {
  id_usuario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  correo: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  contrasena: { type: DataTypes.STRING(255), allowNull: false },
  id_rol: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: "usuario",   // 👈 en minúscula
  timestamps: false
});


// Asociación
Usuario.belongsTo(Rol, { foreignKey: "id_rol" });

module.exports = Usuario;
