import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SucursalService } from '../../services/Administrador/sucursal-service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';


@Component({
    selector: 'app-home-sucursal',
    imports: [CommonModule, RouterModule],
    standalone: true,
    templateUrl: '../../html/Administrador/home_sucursales.html',
    styleUrls: ['../../css/home_sucursales.css']
})
export class HomeSucursalComponent implements OnInit {
    // Detalles de sucursal activa
    sucursal: any;
    creadorId = 2; // 👈 fijo por ahora, pero podría venir de localStorage o un token
    sucursales: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private sucursalService: SucursalService,
        private cookieService: CookieService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        const idSucursal = Number(this.route.snapshot.paramMap.get('id'));
        this.cargarSucursal(idSucursal);
        this.cargarSucursales();
    }

    cargarSucursal(idSucursal: number): void {
        this.sucursalService.consultarSucursalPorId(idSucursal, this.creadorId, this.cookieService.get('token')).subscribe({
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
        this.sucursalService.consultarSucursales(2, this.cookieService.get('token')).subscribe({
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

    irARegistrarSucursal() {
        this.router.navigate(['/admin/registrar_sucursal']);
    }
}
