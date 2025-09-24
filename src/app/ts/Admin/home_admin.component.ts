import { Component } from '@angular/core';

@Component({
    selector: 'app-home-admin',
    templateUrl: '../../html/Administrador/home_admin.html',
    styleUrls: ['../../css/home_admin.css']
})


export class HomeAdminComponent {
    sucursales = [
        { nombre: 'Central', telefono: '(555) 123-4567', jefe: 'A. Reyes' },
        { nombre: 'Norte', telefono: '(555) 123-4567', jefe: 'P. Martínez' }
    ];

    proveedores = [
        { nombre: 'Fresh Co', telefono: '(555) 123-4567', email: 'fresh@email.com', estado: 'Activo' },
        { nombre: 'Prime Foods', telefono: '(555) 123-4567', email: 'sales@primefoods.com', estado: 'Pendiente' }
    ];

    listas = [
        { producto: 'Tomate', codigo: 'To2342', activo: 'Sí' }
    ];

    usuarios = [
        { nombre: 'N. Ramirez', email: 'nramirez@kg.com', rol: 'Admin', estado: 'Activo' }
    ];
}
