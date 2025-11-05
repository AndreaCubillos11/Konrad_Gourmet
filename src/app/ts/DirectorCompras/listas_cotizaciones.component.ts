import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Cotizacion {
    producto: string;
    proveedor: string;
    unidad: string;
    precioSipsa: number;
    precioCotizado: number;
    porcentaje: number;
    estado: string;
    validaHasta: string;
    seleccionada: boolean;
}

interface Filtros {
    proveedor: string;
    producto: string;
}

@Component({
    selector: 'app-cotizaciones-opcionadas',
    templateUrl: '../../html/DirectorCompras/lista_cotizaciones.html',
    styleUrls: ['../../css/listas_cotizaciones.css'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class ListaCotizacionesComponent implements OnInit {
    constructor(private router: Router) { }

    // Lista de cotizaciones "OPCIONADA" (ejemplo estático)
    cotizacionesCompletas: Cotizacion[] = [
        {
            producto: 'Arroz (blanco)',
            proveedor: 'Grupeño Plus',
            unidad: 'Kilogramo',
            precioSipsa: 2300,
            precioCotizado: 2200,
            porcentaje: -4.3,
            estado: 'OPCIONADA',
            validaHasta: '01-oct-25',
            seleccionada: false
        },
        {
            producto: 'Fríjoles (rojos)',
            proveedor: 'Distribuidora Andina',
            unidad: 'Kilogramo',
            precioSipsa: 4100,
            precioCotizado: 4300,
            porcentaje: 4.9,
            estado: 'OPCIONADA',
            validaHasta: '29-sep-25',
            seleccionada: false
        },
        {
            producto: 'Fríjoles (rojos)',
            proveedor: 'Alimentos del Valle',
            unidad: 'Kilogramo',
            precioSipsa: 4100,
            precioCotizado: 3900,
            porcentaje: -4.9,
            estado: 'OPCIONADA',
            validaHasta: '02-oct-25',
            seleccionada: false
        },
        {
            producto: 'Azúcar (blanca)',
            proveedor: 'Proveedora Norte',
            unidad: 'Kilogramo',
            precioSipsa: 1800,
            precioCotizado: 2200,
            porcentaje: 22.2,
            estado: 'OPCIONADA',
            validaHasta: '28-sep-25',
            seleccionada: false
        },
        {
            producto: 'Azúcar (blanca)',
            proveedor: 'Dulces del Sur',
            unidad: 'Kilogramo',
            precioSipsa: 1800,
            precioCotizado: 1700,
            porcentaje: -5.6,
            estado: 'OPCIONADA',
            validaHasta: '03-oct-25',
            seleccionada: false
        },
        {
            producto: 'Café (tostado)',
            proveedor: 'Café Premium',
            unidad: 'Kilogramo',
            precioSipsa: 3500,
            precioCotizado: 3800,
            porcentaje: 8.6,
            estado: 'OPCIONADA',
            validaHasta: '05-oct-25',
            seleccionada: false
        },
        {
            producto: 'Café (tostado)',
            proveedor: 'Importadora Andina',
            unidad: 'Kilogramo',
            precioSipsa: 3500,
            precioCotizado: 3200,
            porcentaje: -8.6,
            estado: 'OPCIONADA',
            validaHasta: '04-oct-25',
            seleccionada: false
        }
    ];

    // Cotizaciones filtradas (inicialmente todas las "OPCIONADA")
    cotizacionesFiltradas: Cotizacion[] = [...this.cotizacionesCompletas];

    // Filtros
    filtros: Filtros = {
        proveedor: '',
        producto: ''
    };

    ngOnInit() {
        // No es necesario recalcular nada, solo mostramos los datos de ejemplo
    }

    // Método para formatear números
    formatNumber(value: number): string {
        return value.toLocaleString('es-ES');
    }

    // Verificar si la cotización sigue válida (simulación)
    esValido(validaHasta: string): boolean {
        // Simulación: todas las fechas son válidas en este ejemplo
        return true;
    }

    // Aplicar filtros
    aplicarFiltros() {
        this.cotizacionesFiltradas = this.cotizacionesCompletas.filter(cotizacion => {
            const coincideProveedor = !this.filtros.proveedor ||
                cotizacion.proveedor.toLowerCase().includes(this.filtros.proveedor.toLowerCase());
            const coincideProducto = !this.filtros.producto ||
                cotizacion.producto.toLowerCase().includes(this.filtros.producto.toLowerCase());
            return coincideProveedor && coincideProducto;
        });
    }

    // Limpiar filtros
    limpiarFiltros() {
        this.filtros = {
            proveedor: '',
            producto: ''
        };
        this.cotizacionesFiltradas = [...this.cotizacionesCompletas];
    }

    // Toggle selección
    toggleSeleccion(index: number) {
        this.cotizacionesFiltradas[index].seleccionada = !this.cotizacionesFiltradas[index].seleccionada;
    }

    // Verificar si hay seleccionadas
    tieneSeleccionadas(): boolean {
        return this.cotizacionesFiltradas.some(cot => cot.seleccionada);
    }

    // Obtener cotizaciones seleccionadas
    obtenerSeleccionadas(): Cotizacion[] {
        return this.cotizacionesFiltradas.filter(cot => cot.seleccionada);
    }

    // Limpiar selección
    limpiarSeleccion() {
        this.cotizacionesFiltradas.forEach(cot => cot.seleccionada = false);
    }

    // Generar orden de compra (simulación)
    generarOrdenCompra() {
        const seleccionadas = this.obtenerSeleccionadas();
        if (seleccionadas.length === 0) {
            alert('Por favor selecciona al menos una cotización para generar la orden de compra');
            return;
        }
        // Confirmar generación de orden
        const confirmacion = confirm(
            `¿Estás seguro de generar la orden de compra con ${seleccionadas.length} cotizaciones seleccionadas?\n\nSe crearán órdenes de compra con los mismos datos de las cotizaciones.`
        );
        if (confirmacion) {
            alert(`✅ ${seleccionadas.length} órdenes de compra generadas exitosamente\n\nSe mantienen los mismos datos de las cotizaciones seleccionadas.`);
            this.limpiarSeleccion();
        }
    }
}
