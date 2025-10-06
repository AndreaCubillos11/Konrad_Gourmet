import { Component } from '@angular/core';

@Component({
    selector: 'app-solicitud-cotizacion',
    templateUrl: '../../html/AuxiliarCompra/solicitud_cotizacion.html',
    styleUrls: ['../../css/solicitud_cotizacion.css']
})
export class SolicitudCotizacionComponent {
    pdfGenerado: boolean = false;

    generarPDF() {
        // Aquí iría la lógica real para generar el PDF (ejemplo: jsPDF)
        console.log('Generando PDF...');
        this.pdfGenerado = true; // Activa el botón de enviar
    }

    enviarCotizacion() {
        if (this.pdfGenerado) {
            console.log('Cotización enviada');
            alert('Cotización enviada con éxito');
        }
    }
}
