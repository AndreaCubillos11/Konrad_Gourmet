// models/Promocion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ajusta la ruta según tu estructura
const Producto=require("../models/Producto");
const Promocion = sequelize.define('Promocion', {
  id_promocion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  precio_promocional: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  fecha_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fecha_fin: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Producto', // nombre de la tabla relacionada
      key: 'id_producto'
    }
  }
}, {
  tableName: 'promocion',
  schema: 'public',
  timestamps: false
});

Producto.hasMany(Promocion, { foreignKey: 'id_producto' });
Promocion.belongsTo(Producto, { foreignKey: 'id_producto' });

module.exports = Promocion;
