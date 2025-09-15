const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Unidad = sequelize.define("Unidad", {
    id_unidad: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_unidad: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    tableName: "unidad",
    timestamps: false
});

module.exports = Unidad;
