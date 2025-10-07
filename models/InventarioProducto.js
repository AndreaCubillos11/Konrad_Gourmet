const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelos relacionados
const Producto = require('./Producto');
const Inventario = require('./Inventario');

const InventarioProducto = sequelize.define('InventarioProducto', {
    id_inventario_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad_producto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'producto',
            key: 'id_producto',
        },
    },
    id_inventario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'inventario',
            key: 'id_inventario',
        },
    },
    stock_maximo: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 100,
    },
    stock_minimo: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 30,
    },
}, {
    tableName: 'inventarioproducto',
    schema: 'public',
    timestamps: false,
});

// 🔗 Relaciones
InventarioProducto.belongsTo(Producto, {
    foreignKey: 'id_producto',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

InventarioProducto.belongsTo(Inventario, {
    foreignKey: 'id_inventario',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

module.exports = InventarioProducto;
