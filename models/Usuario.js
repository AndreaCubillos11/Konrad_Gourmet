const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Rol = require("./Rol");



const Usuario = sequelize.define("Usuario", {
  id_usuario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  correo: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  contrasena: { type: DataTypes.STRING(255), allowNull: false },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "rol", // nombre de la tabla en la BD
      key: "id_rol"
    }
  }
},


  {
    tableName: "usuario",   // 👈 en minúscula
    timestamps: false
  });

// Usuario.js
Usuario.belongsTo(Rol, { foreignKey: "id_rol" });

// Rol.js
Rol.hasMany(Usuario, { foreignKey: "id_rol" });

module.exports = Usuario;
