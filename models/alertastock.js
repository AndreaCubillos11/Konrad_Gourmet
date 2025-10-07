const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta a tu conexión

// Importa los modelos relacionados
const InventarioProducto = require('./InventarioProducto');
const Sucursal = require('./Sucursal');

const AlertaStock = sequelize.define('AlertaStock', {
    id_alerta_stock: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_inventario_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'inventarioproducto',
            key: 'id_inventario_producto',
        },
    },
    id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sucursal',
            key: 'id_sucursal',
        },
    },
    tipo_alerta: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    mensaje: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha_alerta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'PENDIENTE',
    },
}, {
    tableName: 'alertastock',
    timestamps: false, // La tabla no tiene createdAt ni updatedAt
});

//  Asociaciones
AlertaStock.belongsTo(InventarioProducto, {
    foreignKey: 'id_inventario_producto',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

AlertaStock.belongsTo(Sucursal, {
    foreignKey: 'id_sucursal',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

module.exports = AlertaStock;
