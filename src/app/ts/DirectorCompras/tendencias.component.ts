import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tendencias',
    templateUrl: '../../html/DirectorCompras/tendencias.html',
    styleUrls: ['../../css/tendencias.css']
})
export class TendenciasComponent {

    constructor(private router: Router) { }


    // --- Estado de las pestañas superiores ---
    activeTab: string = 'tendencias';

    // --- Estado de los filtros ---
    filtros: string[] = [
        'Bajos precios',
        'Tendencias sociales',
        'Nuevo SKU',
        'Promoción destacada',
        'Clima',
        'Festividades'
    ];

    filtroActivo: string = 'Bajos precios';

    // --- Datos de la tabla de impulsores ---
    impulsores = [
        {
            impulsor: 'Características de venta minorista',
            impacto: '+6.4%',
            confianza: 'Alto',
            accion: 'Reproducir exactamente',
            notas: '-'
        },
        {
            impulsor: 'Disminución de precios',
            impacto: '+3.1%',
            confianza: 'Medio',
            accion: 'Evaluar',
            notas: '-'
        },
        {
            impulsor: 'Tendencias sociales',
            impacto: '+2.4%',
            confianza: 'Bajo',
            accion: 'Monitor',
            notas: '-'
        }
    ];

    // --- Simula el cambio de pestañas ---
    cambiarTab(tab: string): void {
        this.activeTab = tab;
    }

    // --- Cambia el filtro activo ---
    seleccionarFiltro(filtro: string): void {
        this.filtroActivo = filtro;
        console.log('Filtro seleccionado:', filtro);
    }

    // --- Simula la exportación de datos ---
    exportarDatos(): void {
        // En una app real podrías generar CSV o PDF aquí
        console.log('Exportando datos de tendencia...');
        alert('Datos exportados correctamente.');
    }

    irAPromociones() {
        this.router.navigate(['directorCompras/promociones']);
    }
}
