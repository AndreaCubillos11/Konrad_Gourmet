const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


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
    nit: {
        type: DataTypes.STRING(20),
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
    },
    ciudad: {
        type: DataTypes.STRING(100),
        allowNull: true,
    }
}, {
    tableName: "proveedor",
    timestamps: false
});


module.exports = Proveedor;