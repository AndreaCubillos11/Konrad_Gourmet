const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const OrdenCompra = require("./OrdenCompra");
const Cotizacion = require("./Cotizacion");

const Proveedor = sequelize.define("Proveedor", {
    id_proveedor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            isEmail: true
        }
    }
}, {
    tableName: "proveedor",
    timestamps: false
});

// Relaciones
Proveedor.hasMany(OrdenCompra, { foreignKey: "id_proveedor" });
OrdenCompra.belongsTo(Proveedor, { foreignKey: "id_proveedor" });

Proveedor.hasMany(Cotizacion, { foreignKey: "id_proveedor" });
Cotizacion.belongsTo(Proveedor, { foreignKey: "id_proveedor" });

module.exports = Proveedor;