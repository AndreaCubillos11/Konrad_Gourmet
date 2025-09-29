import { Component } from '@angular/core';

@Component({
    selector: 'app-solicitud-alimentos',
    templateUrl: '../../html/JefeCocina/solicitud_alimentos.html',
    styleUrls: ['../../css/solicitud_alimentos.css']
})
export class SolicitudAlimentosComponent {

    enviarSolicitud() {
        alert('Solicitud enviada correctamente ✅');
    }

    cancelar() {
        alert('Solicitud cancelada ❌');
    }

    agregarProducto() {
        alert('Producto agregado ➕');
    }

    eliminarProducto() {
        alert('Producto eliminado ➖');
    }
}
