import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-auxiliar',
    templateUrl: '../../html/AuxiliarCompra/home_auxiliar.html',
    styleUrls: ['../../css/home_auxiliar.css']
})
export class HomeAuxiliarComponent {
    solicitudesPendientes: number = 5;
    cotizacionesEnviadas: number = 12;

    constructor(private router: Router) { }

    consultarSolicitudes() {
        this.router.navigate(['/solicitudes']);
    }

    crearCotizacion() {
        this.router.navigate(['/cotizaciones']);
    }

    cerrarSesion() {
        // Aquí puedes limpiar datos o tokens si los usas
        console.log('Cerrando sesión...');
        this.router.navigate(['/login']); // Redirige al login
    }
}
