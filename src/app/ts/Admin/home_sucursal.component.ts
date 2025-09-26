import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SucursalService } from '../../services/Administrador/sucursal-service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home-sucursal',
    imports: [CommonModule],
    templateUrl: '../../html/Administrador/home_sucursales.html',
    styleUrls: ['../../css/home_sucursales.css']
})
export class HomeSucursalComponent implements OnInit {
    // Detalles de sucursal activa
    sucursal: any;
    creadorId = 2; // 👈 fijo por ahora, pero podría venir de localStorage o un token
    sucursales: any[] = [];


    /* Lista de sucursales
    sucursales: Sucursal[] = [
        { nombre: 'Central', direccion: '9° a, Ac. 11 Sur #956', telefono: '(555) 123-4567', jefeCocina: 'A. Reyes', status: 'Activo' },
        { nombre: 'Norte', direccion: '9° a, Ac. 11 Sur #956', telefono: '(555) 123-4567', jefeCocina: 'N. Ramírez', status: 'Pendiente' }
    ];

    // Inventario
    inventario: Inventario[] = [
        { producto: 'Tomate', unidad: 12, capacidad: 100, estatus: '12%', actualizado: 'Hoy' },
        { producto: 'Aceite de oliva', unidad: 70, capacidad: 200, estatus: '35%', actualizado: 'Hoy' }
    ];

    total = 7;
    activos = 5;
    stockBajo = 1;
*/
    constructor(
        private route: ActivatedRoute,
        private sucursalService: SucursalService
    ) { }

    ngOnInit(): void {
        const idSucursal = Number(this.route.snapshot.paramMap.get('id'));
        this.cargarSucursal(idSucursal);
        this.cargarSucursales();
    }

    cargarSucursal(idSucursal: number): void {
        this.sucursalService.consultarSucursalPorId(idSucursal, this.creadorId).subscribe({
            next: (data) => {
                this.sucursal = data.sucursal;
                console.log('Detalle de sucursal:', this.sucursal);
            },
            error: (err) => {
                console.error('Error al consultar la sucursal', err);
            }
        });
    }

        cargarSucursales(): void {
        this.sucursalService.consultarSucursales(2).subscribe({
            next: (data) => {
                this.sucursales = data.sucursales;
            },
            error: (error) => {
                console.error('Error en consulta de sucursales', error);
            }
        });
    }

    editarSucursal() {
        alert('Función editar sucursal en construcción...');
    }
}
