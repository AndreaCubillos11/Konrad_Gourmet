import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SucursalService } from '../../services/Administrador/sucursal-service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home-admin',
    standalone: true,
    imports: [CommonModule, RouterModule], // ← Importa RouterModule aquí también
    templateUrl: '../../html/Administrador/home_admin.html',
    styleUrls: ['../../css/home_admin.css']
})
export class HomeAdminComponent implements OnInit {
    sucursal: any[] = [];
    sucursalSeleccionada: any = null;

    constructor(
        private router: Router,
        private sucursalService: SucursalService,
        private cookieService: CookieService
    ) { }

    ngOnInit(): void {
        this.cargarSucursales();
    }

    cargarSucursales(): void {
        this.sucursalService.consultarSucursales(2, this.cookieService.get('token')).subscribe({
            next: (data) => {
                this.sucursal = data.sucursales;
            },

            error: (error) => {
                console.error('Error en consulta de sucursales', error);
            }
        });
    }
    seleccionarSucursal(s: any): void {
        this.sucursalSeleccionada = s;
    }
    verDetalles(): void {
        this.router.navigate(['/home_sucursal', this.sucursalSeleccionada.id_sucursal]);
    }

}
