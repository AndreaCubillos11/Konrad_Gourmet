const axios = require('axios');
const { parseStringPromise } = require('xml2js');

class SipsaAdapter {
  constructor() {
    this.soapUrl = 'http://appweb.dane.gov.co:80/sipsaWS/SrvSipsaUpraBeanService';
    this.soapNamespace = 'http://servicios.sipsa.co.gov.dane/';
  }

  async getPromediosPorCiudad() {
    const xmlRequest = `
      <soap12:Envelope
          xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"
          xmlns:sip="${this.soapNamespace}">
        <soap12:Header/>
        <soap12:Body>
          <sip:promediosSipsaCiudad/>
        </soap12:Body>
      </soap12:Envelope>
    `;

    try {
      const response = await axios.post(this.soapUrl, xmlRequest, {
        headers: {
          'Content-Type': 'application/soap+xml; charset=utf-8',
        },
        timeout: 20000,
      });

      console.log('Respuesta SOAP:', response.data); // 👈 imprime el XML completo

      const json = await parseStringPromise(response.data, { explicitArray: false });
      return json;
    } catch (error) {
      console.error('Error en SipsaAdapter:', error.message);
      throw new Error('No se pudo conectar al servicio SOAP de SIPSA.');
    }
  }
}

module.exports = { SipsaAdapter };
