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

      const data = response.data.trim();

      // 🧩 Si la respuesta es HTML, usar XML quemado
      if (data.startsWith('<html>')) {
        console.warn('⚠️ Respuesta HTML en lugar de XML, usando XML quemado...');
        return await this.getXMLQuemado();
      }

      // 🧩 Intentar parsear a JSON
      const json = await parseStringPromise(data, { explicitArray: false });

      // Si el JSON no tiene data o registros
      if (!json || Object.keys(json).length === 0) {
        console.warn('⚠️ Data vacía en respuesta de SIPSA, usando XML quemado...');
        return await this.getXMLQuemado();
      }

      return json;

    } catch (error) {
      console.error('❌ Error en SipsaAdapter:', error.message);
      console.warn('⚠️ Usando XML quemado de respaldo...');
      return await this.getXMLQuemado();
    }
  }
 async getXMLQuemado() {
    const xmlBackup = `
      <ProductosCanasta>
        <Producto>
          <Nombre>Arroz (kg)</Nombre>
          <Precio>3500</Precio>
        </Producto>
        <Producto>
          <Nombre>Frijol (kg)</Nombre>
          <Precio>5200</Precio>
        </Producto>
        <Producto>
          <Nombre>Azúcar (kg)</Nombre>
          <Precio>3600</Precio>
        </Producto>
        <Producto>
          <Nombre>Leche (litro)</Nombre>
          <Precio>4200</Precio>
        </Producto>
        <Producto>
          <Nombre>Huevos (30 und)</Nombre>
          <Precio>15000</Precio>
        </Producto>
        <Producto>
          <Nombre>Pan (unidad)</Nombre>
          <Precio>500</Precio>
        </Producto>
        <Producto>
          <Nombre>Aceite (litro)</Nombre>
          <Precio>12000</Precio>
        </Producto>
        <Producto>
          <Nombre>Carne de res (kg)</Nombre>
          <Precio>18000</Precio>
        </Producto>
        <Producto>
          <Nombre>Pollo (kg)</Nombre>
          <Precio>9500</Precio>
        </Producto>
        <Producto>
          <Nombre>Papa (kg)</Nombre>
          <Precio>2500</Precio>
        </Producto>
      </ProductosCanasta>
    `;

    const jsonBackup = await parseStringPromise(xmlBackup, { explicitArray: false });

    return {
      ok: true,
      totalRegistros: jsonBackup.ProductosCanasta.Producto.length,
      data: jsonBackup.ProductosCanasta.Producto
    };
  }
}

module.exports = { SipsaAdapter };
