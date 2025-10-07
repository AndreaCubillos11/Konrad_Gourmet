const { Op } = require("sequelize");
const Cotizacion = require("../models/Cotizacion");
const CotizacionDetalle = require("../models/CotizacionDetalle");
const SolicitudAlimento = require("../models/SolicitudAlimento");
const EstadoCotizacion = require("../models/EstadoCotizacion");

class CotizacionFactory {
    static async crearDesdeSolicitud({ id_solicitud, id_proveedor, fecha_maxima_resp }) {
        // 1️⃣ Buscar la solicitud base
        const solicitud = await SolicitudAlimento.findOne({ where: { id_solicitud } });
        if (!solicitud) throw new Error("Solicitud no encontrada");

        // Validación 3: Al menos un producto en la solicitud
        if (!solicitud.id_producto) {
            throw new Error("La solicitud no tiene ningún producto asociado.");
        }

        // 2️⃣ Buscar estado "ENVIADA" (ignorando mayúsculas/minúsculas)
        const estadoEnviada = await EstadoCotizacion.findOne({
            where: { nombre_estado: { [Op.iLike]: "ENVIADA" } },
        });

        if (!estadoEnviada) throw new Error("El estado 'ENVIADA' no existe.");

        // 3️⃣ Crear objeto Cotizacion con el estado correcto
        const cotizacion = {
            fecha_maxima_resp,
            id_solicitud,
            id_proveedor,
            id_estado: estadoEnviada.id_estado, // se toma dinámicamente
        };

        // 4️⃣ Crear detalle de cotización (una solicitud = un producto)
        const detalles = [
            {
                cantidad: solicitud.cantidad,
                precio_unitario: 0,
                id_producto: solicitud.id_producto,
            },
        ];

        return { cotizacion, detalles };
    }
}

module.exports = CotizacionFactory;
