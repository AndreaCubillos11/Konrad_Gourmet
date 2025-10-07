const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // importa tu instancia de conexión
const Cotizacion=require("./Cotizacion");
const Producto=require("./Producto");


const CotizacionDetalle = sequelize.define("CotizacionDetalle", {
  id_detalle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  id_cotizacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "cotizaciondetalle",
  schema: "public",
  timestamps: false
});

// Cada detalle pertenece a una cotización
CotizacionDetalle.belongsTo(Cotizacion, {
  foreignKey: "id_cotizacion",
  as: "cotizacion"
});

// Cada detalle pertenece a un producto
CotizacionDetalle.belongsTo(Producto, {
  foreignKey: "id_producto",
  as: "producto"
});

module.exports = CotizacionDetalle;
