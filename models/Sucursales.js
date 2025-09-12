// models/sucursal.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // conexión configurada a la BD
const Usuario = require("./Usuario"); // importamos el modelo Usuario

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
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: "usuario", // nombre de la tabla en la BD
      key: "id_usuario"
    }
  }
}, {
  tableName: "sucursal",
  timestamps: false
});

// Relación: un usuario puede ser encargado de una sucursal
Sucursal.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(Sucursal, { foreignKey: "id_usuario" });

module.exports = Sucursal;
