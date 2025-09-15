const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const CategoriaProducto = require("./CategoriaProducto");
const Marca = require("./Marca");
const Unidad = require("./Unidad");

const Producto = sequelize.define("Producto", {
    id_producto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    id_unidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Unidad,
            key: "id_unidad"
        }
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CategoriaProducto,
            key: "id_categoria"
        }
    },
    id_marca: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Marca,
            key: "id_marca"
        }
    }
}, {
    tableName: "producto",
    timestamps: false
});

// 🔗 Relaciones
Producto.belongsTo(CategoriaProducto, { foreignKey: "id_categoria" });
CategoriaProducto.hasMany(Producto, { foreignKey: "id_categoria" });

Producto.belongsTo(Marca, { foreignKey: "id_marca" });
Marca.hasMany(Producto, { foreignKey: "id_marca" });

Producto.belongsTo(Unidad, { foreignKey: "id_unidad" });
Unidad.hasMany(Producto, { foreignKey: "id_unidad" });

module.exports = Producto;
