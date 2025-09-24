// models/SolicitudAlimento.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Producto = require("./Producto");
const Sucursal = require("./Sucursales");
const Usuario = require("./Usuario");
const EstadoSolicitud = require("./EstadoSolicitud");
const CategoriaProducto = require("./CategoriaProducto");
const Marca=require("./Marca");
const Unidad=require("./Unidad");

const SolicitudAlimento = sequelize.define("SolicitudAlimento", {
    id_solicitud: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cantidad: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fecha_solicitud: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "producto",
            key: "id_producto"
        }
    },
    id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "sucursal",
            key: "id_sucursal"
        }
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuario",
            key: "id_usuario"
        }
    },
    id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "estadosolicitud",
            key: "id_estado"
        }
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "categoriaproducto",
            key: "id_categoria"
        }
    },
    id_marca: {
        type: DataTypes.INTEGER,
        allowNull: true, // Permite null
        references: {
            model: "marca",
            key: "id_marca"
        }
    },
    id_unidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "unidad",
            key: "id_unidad"
        }
    }


}, {
    tableName: "solicitudalimento",
    timestamps: false
});

// Relaciones (N:1)
SolicitudAlimento.belongsTo(Producto, {
    foreignKey: "id_producto",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

SolicitudAlimento.belongsTo(Sucursal, {
    foreignKey: "id_sucursal",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

SolicitudAlimento.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

SolicitudAlimento.belongsTo(EstadoSolicitud, {
    foreignKey: "id_estado",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

SolicitudAlimento.belongsTo(CategoriaProducto, {
    foreignKey: "id_categoria",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
SolicitudAlimento.belongsTo(Marca, {
    foreignKey: "id_marca",
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
}); // 👈 Opcional

SolicitudAlimento.belongsTo(Unidad, {
    foreignKey: "id_unidad",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
}); // 👈 Opcional


module.exports = SolicitudAlimento;
