// models/Plato.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const CategoriaPlato = require("./CategoriaPlato");
const PlatoProducto=require("./PlatoProducto");

const Plato = sequelize.define("Plato", {
    id_plato: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    precio_venta: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "CategoriaPlato",
            key: "id_categoria"
        }
    }
}, {
    tableName: "plato",
    timestamps: false
});

// Asociaciones

Plato.belongsTo(CategoriaPlato, {  foreignKey: "id_categoria"});

Plato.hasMany(PlatoProducto, {foreignKey: "id_plato"});

module.exports = Plato;
