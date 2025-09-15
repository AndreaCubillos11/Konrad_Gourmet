// models/Marca.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Marca = sequelize.define("Marca", {
    id_marca: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_marca: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    tableName: "marca",
    timestamps: false
});

module.exports = Marca;
