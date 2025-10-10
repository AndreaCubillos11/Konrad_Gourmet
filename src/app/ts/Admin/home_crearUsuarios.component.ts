import { Component } from '@angular/core';
import { UsuarioService } from '../../services/Administrador/usuario-service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Proveedores } from '../../services/Administrador/proveedores';
import { Router } from '@angular/router';
import { SucursalService } from '../../services/Administrador/sucursal-service';
import { RouterModule } from '@angular/router';



@Component({
    selector: 'app-home-crear-usuarios',
    templateUrl: '../../html/Administrador/home_crearUsuarios.html',
    styleUrls: ['../../css/home_crearUsuarios.css'],
    imports: [CommonModule, RouterModule]
})
export class HomeCrearUsuariosComponent {

    usuarios: any[] = [];
    sucursales: any[] = [];

    constructor(
        private router: Router,
        private usuarioService: UsuarioService,
        private cookieService: CookieService,
        private proveedorService: Proveedores,
        private sucursalService: SucursalService // 👈 Servicio para obtener las sucursales
    ) { }

    ngOnInit(): void {
        this.cargarDatos();
    }

    // Carga usuarios y sucursales, luego los relaciona
    cargarDatos(): void {
        Promise.all([
            this.usuarioService.consultarUsuarios(2, this.cookieService.get('token')).toPromise(),
            this.sucursalService.consultarSucursales(localStorage.getItem('id_usuario'),this.cookieService.get('token')).toPromise()
        ])
            .then(([usuariosData, sucursalesData]) => {
                this.usuarios = usuariosData.usuarios;
                this.sucursales = sucursalesData.sucursales;

                // Relacionar cada usuario con su sucursal
                this.usuarios.forEach(usuario => {
                    const sucursal = this.sucursales.find(s => s.id_usuario === usuario.id_usuario);
                    usuario.sucursal = sucursal ? sucursal.nombre : 'Sin asignar';
                });

                console.log(this.usuarios);
            })
            .catch(error => {
                console.error('Error cargando usuarios o sucursales:', error);
            });
    }

}
