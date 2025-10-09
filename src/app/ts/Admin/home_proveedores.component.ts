import { Component } from '@angular/core';
import { Proveedores } from '../../services/Administrador/proveedores';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-proveedores',
  templateUrl: '../../html/Administrador/home_proveedores.html',
  styleUrls: ['../../css/home_proveedores.css'],
  imports: [CommonModule]
})
export class HomeProveedoresComponent {

    proveedores: any[] = [];

  constructor(
    private router: Router,
    private proveedorService: Proveedores,
    private cookieService: CookieService
  ) { }

  pedidosSucursal = [
    { sucursal: 'Centro', proveedor: 'FreshCo', ordenes: 2, ultima: '01-06-2025' },
    { sucursal: 'Norte', proveedor: 'Prime Food', ordenes: 1, ultima: '01-07-2025' }
  ];


  ngOnInit() {
        this.obtenerProveedores();
    }

  obtenerProveedores() {
    this.proveedorService.consultarProveedores(localStorage.getItem('id_usuario'), this.cookieService.get('token')).subscribe({
        next: (data) => {
          console.log(data);
          this.proveedores = data.proveedores}

        ,
        error: (err) => console.error('Error al consultar los proveedores:', err)
      })
    } 
}
