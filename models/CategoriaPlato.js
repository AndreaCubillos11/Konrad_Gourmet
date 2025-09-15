// models/CategoriaPlato.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CategoriaPlato = sequelize.define("CategoriaPlato", {
    id_categoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_categoria: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: "categoriaplato",
    timestamps: false
});

module.exports = CategoriaPlato;
