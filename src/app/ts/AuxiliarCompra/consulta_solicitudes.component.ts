import { Component } from '@angular/core';

@Component({
    selector: 'app-consulta-solicitudes',
    templateUrl: '../../html/AuxiliarCompra/consulta_solicitudes.html',
    styleUrls: ['../../css/consulta_solicitudes.css']
})
export class ConsultaSolicitudesComponent {

    constructor() { }

    buscarSolicitudes() {
        console.log("Buscando solicitudes...");
        // Aquí iría la lógica real de filtrado con servicio
    }

    generarReporte() {
        console.log("Generando reporte...");
        // Aquí se implementa la descarga/exportación
    }

    verSolicitud(id: number) {
        console.log("Ver detalle de solicitud: ", id);
    }

    descargarSolicitud(id: number) {
        console.log("Descargar solicitud: ", id);
    }
}
