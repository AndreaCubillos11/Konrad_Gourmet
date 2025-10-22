import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
    selector: 'app-home-direc-compras',
    standalone: true, // si lo estás usando como componente standalone
    imports: [CommonModule], // 👈 agrega esto
    templateUrl: '../../html/DirectorCompras/home_direc_compras.html',
    styleUrls: ['../../css/home_direc_compras.css']
})

export class HomeDirecComprasComponent implements OnInit {


    // === Datos para la tabla de ventas ===
    ventasData = [
        { sucursal: 'Sur', productos: 'Platos', descuentos: '10%', otros: 'No aplica', total: '$3,256,777' },
        { sucursal: 'Norte', productos: 'Bebidas', descuentos: '-', otros: 'No aplica', total: '$3,256,777' },
        { sucursal: 'Centro', productos: 'Postres', descuentos: '40%', otros: 'No aplica', total: '$3,256,777' }
    ];

    // === Datos del monitoreo empresarial ===
    actividadEmpresarial = {
        productoMasVendido: 'Raviolis',
        sucursalSuperior: 'Centro - Bogotá',
        liderPrecios: 'BellaFoods Ltda.',
        impactoPromocion: '+12% de aumento'
    };

    // === Datos de comparación de precios ===
    comparacionPrecios = [
        { proveedor: 'Prime Foods', precio: '$234.234' },
        { proveedor: 'Fine Foods', precio: '$100.234' },
        { proveedor: 'Ocean Fishs', precio: '$670.098' }
    ];

    constructor(private router: Router) { }


    ngOnInit(): void {
        this.cargarDatosIniciales();
    }

    // --- Simulación de carga inicial ---
    cargarDatosIniciales(): void {
        console.log('Cargando datos iniciales...');
        // Aquí podrías llamar a un servicio real más adelante
    }

    // --- Refrescar datos ---
    refreshData(): void {
        console.log('Refrescando datos...');
        alert('Datos actualizados correctamente');
    }

    // --- Métodos adicionales (placeholders para futuro) ---
    exportarReporte(): void {
        console.log('Exportando reporte...');
    }

    irAPromocionesYTendencias() {
        this.router.navigate(['directorCompras/promociones']);
    }

    verDetalleSucursal(sucursal: string): void {
        console.log('Viendo detalle de sucursal:', sucursal);
    }
}
