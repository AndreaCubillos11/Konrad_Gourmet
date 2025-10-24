const { SipsaAdapter } = require('../adapters/sipsaAdapter.js');
const adapter = new SipsaAdapter();

exports.obtenerPromediosCiudad = async (req, res, next) => {
    try {
        const { ciudad } = req.query; // filtro opcional

        const rawData = await adapter.getPromediosPorCiudad();

        const registros =
            rawData?.['soap12:Envelope']?.['soap12:Body']?.['ns2:promediosSipsaCiudadResponse']?.return || [];

        const lista = Array.isArray(registros) ? registros : [registros];

        // Filtro local (por nombre de ciudad)
        const filtrados = ciudad
            ? lista.filter(item => item.ciudad?.toLowerCase().includes(ciudad.toLowerCase()))
            : lista;

        const data = filtrados.map(item => ({
            ciudad: item.ciudad,
            producto: item.producto,
            codProducto: item.codProducto,
            precioPromedio: Number(item.precioPromedio),
            fechaCaptura: item.fechaCaptura,
            fechaCreacion: item.fechaCreacion,
            regId: item.regId,
        }));

        res.status(200).json({
            ok: true,
            totalRegistros: data.length,
            data,
        });
    } catch (error) {
        console.error('Error al consultar promedios ciudad:', error);
        next(error);
    }
};
