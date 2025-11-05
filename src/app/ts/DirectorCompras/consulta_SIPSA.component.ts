import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Agrega esta importación

interface PrecioSipsa {
    producto: string;
    sucursal: string;
    fecha: string;
    unidad: string;
    precio: number;
}

interface Comparacion {
    producto: string;
    precioOficial: number;
    cotizacionPersonal: number;
    porcentaje: number;
}

@Component({
    selector: 'app-consulta-sipsa',
    standalone: true,
    templateUrl: '../../html/DirectorCompras/consulta_SIPSA.html',
    styleUrls: ['../../css/consulta_SIPSA.css'],
    imports: [CommonModule]  // Agrega CommonModule aquí

})
export class ConsultaSIPSAComponent {
    constructor(private router: Router) { }

    // Datos originales
    preciosSipsaCompletos: PrecioSipsa[] = [
        { producto: 'Arroz (blanco)', sucursal: 'Norte', fecha: '1-sep-25', unidad: 'Kilogramo', precio: 23000 },
        { producto: 'Fríjoles (rojos)', sucursal: 'Sur', fecha: '1-sep-25', unidad: 'Kilogramo', precio: 41000 },
        { producto: 'Plátano (verde)', sucursal: 'Centro', fecha: '1-sep-25', unidad: 'Unidad', precio: 11000 },
        { producto: 'Azúcar (blanca)', sucursal: 'Norte', fecha: '1-sep-25', unidad: 'Kilogramo', precio: 18000 },
        { producto: 'Café (tostado)', sucursal: 'Sur', fecha: '1-sep-25', unidad: 'Kilogramo', precio: 35000 }
    ];

    // Datos filtrados
    preciosSipsaFiltrados: PrecioSipsa[] = [...this.preciosSipsaCompletos];

    // Últimas comparaciones (datos de ejemplo)
    ultimasComparaciones: Comparacion[] = [
        { producto: 'Arroz (blanco)', precioOficial: 23000, cotizacionPersonal: 25000, porcentaje: 8.7 },
        { producto: 'Fríjoles (rojos)', precioOficial: 41000, cotizacionPersonal: 38000, porcentaje: -7.3 }
    ];

    // Filtros
    filtroBusqueda: string = '';
    filtroSucursal: string = '';
    filtroTipo: string = '';

    // Método para formatear números
    formatNumber(value: number): string {
        return value.toLocaleString('es-ES');
    }

    // Métodos de filtrado
    onBuscarProductoChange(event: any) {
        this.filtroBusqueda = event.target.value;
        this.aplicarFiltros();
    }

    onSucursalesChange(event: any) {
        this.filtroSucursal = event.target.value;
        this.aplicarFiltros();
    }

    onTipoProductoChange(event: any) {
        this.filtroTipo = event.target.value;
        this.aplicarFiltros();
    }

    onRangoFechaChange(event: any) {
        // Para simplificar, no implementamos filtro por fecha
        console.log('Fecha seleccionada:', event.target.value);
    }

    aplicarFiltros() {
        this.preciosSipsaFiltrados = this.preciosSipsaCompletos.filter(producto => {
            const coincideBusqueda = !this.filtroBusqueda ||
                producto.producto.toLowerCase().includes(this.filtroBusqueda.toLowerCase());

            const coincideSucursal = !this.filtroSucursal ||
                producto.sucursal === this.filtroSucursal;

            const coincideTipo = !this.filtroTipo || this.coincideTipoProducto(producto.producto, this.filtroTipo);

            return coincideBusqueda && coincideSucursal && coincideTipo;
        });
    }

    coincideTipoProducto(nombreProducto: string, tipo: string): boolean {
        const nombreLower = nombreProducto.toLowerCase();
        if (tipo === 'granos') {
            return nombreLower.includes('arroz') || nombreLower.includes('frijol') || nombreLower.includes('café');
        } else if (tipo === 'frutas') {
            return nombreLower.includes('plátano');
        }
        return true;
    }

    limpiarFiltros() {
        this.filtroBusqueda = '';
        this.filtroSucursal = '';
        this.filtroTipo = '';
        this.preciosSipsaFiltrados = [...this.preciosSipsaCompletos];

        // Limpiar inputs
        const inputs = ['buscar-producto', 'sucursales', 'tipo-producto'];
        inputs.forEach(id => {
            const element = document.getElementById(id) as HTMLInputElement;
            if (element) element.value = '';
        });
    }

    // Redirigir a la vista de comparar
    irAComparar() {
        this.router.navigate(['/comparar-cotizaciones']);
    }

    // Estadísticas
    get estadisticas() {
        return {
            porEncima: 0,
            porDebajo: this.preciosSipsaFiltrados.length,
            cotizaciones: this.ultimasComparaciones.length,
            total: '$' + this.formatNumber(this.preciosSipsaFiltrados.reduce((sum, p) => sum + p.precio, 0))
        };
    }
}