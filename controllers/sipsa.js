const { SipsaAdapter } = require('../adapters/sipsaAdapter.js');
const adapter = new SipsaAdapter();

exports.obtenerPromediosCiudad = async (req, res, next) => {
    try {
        const { ciudad } = req.query; // opcional

        const rawData = await adapter.getPromediosPorCiudad();

        // 💡 Si la respuesta es del XML quemado, ya tiene la estructura simple
        if (rawData.ok && Array.isArray(rawData.data)) {
            return res.status(200).json({
                ok: true,
                totalRegistros: rawData.totalRegistros,
                data: rawData.data,
            });
        }

        // 💡 Si la respuesta viene del SOAP real
        const registros =
            rawData?.['soap:Envelope']?.['soap:Body']?.['ns2:promediosSipsaCiudadResponse']?.return || [];

        const lista = Array.isArray(registros) ? registros : [registros];

        return res.status(200).json({
            ok: true,
            totalRegistros: lista.length,
            data: lista,
        });
    } catch (error) {
        console.error('❌ Error al consultar promedios ciudad:', error);
        next(error);
    }
};

