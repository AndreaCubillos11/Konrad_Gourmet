const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuario");

const Auditoria = sequelize.define("Auditoria", {
  id_auditoria: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  accion_registrada: { type: DataTypes.STRING(20), allowNull: false },
  fecha_hora: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: "auditoria",
  timestamps: false
});

Auditoria.belongsTo(Usuario, { foreignKey: "id_usuario" });

module.exports = Auditoria;
