const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LogError = sequelize.define("LogError", {
  id_error: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tipo_error: { type: DataTypes.STRING(50) },
  descripcion: { type: DataTypes.TEXT },
  fecha_hora: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: "logerror",
  timestamps: false
});

module.exports = LogError;
