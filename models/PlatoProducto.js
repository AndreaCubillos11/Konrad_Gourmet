// models/PlatoProducto.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Producto=require("./Producto");
const Plato = require("./Plato");

const PlatoProducto = sequelize.define("PlatoProducto", {
    id_plato_producto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_plato: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "plato",
            key: "id_plato"
        }
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "producto",
            key: "id_producto"
        }
    }
}, {
    tableName: "platoproducto",
    timestamps: false
});

// Asociaciones

PlatoProducto.belongsTo(Producto, {  foreignKey: "id_producto" });

module.exports = PlatoProducto;
