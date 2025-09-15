// models/CategoriaProducto.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CategoriaProducto = sequelize.define("CategoriaProducto", {
    id_categoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_categoria: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: "categoriaproducto",
    timestamps: false
});

module.exports = CategoriaProducto;
