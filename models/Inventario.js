const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta a tu conexión

// Importa el modelo relacionado
const Sucursal = require('./Sucursales');

const Inventario = sequelize.define('Inventario', {
    id_inventario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    unidades_totales: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sucursal',
            key: 'id_sucursal',
        },
    },
}, {
    tableName: 'inventario',
    timestamps: false
});

// 🔗 Asociación
Inventario.belongsTo(Sucursal, {
    foreignKey: 'id_sucursal',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

module.exports = Inventario;
