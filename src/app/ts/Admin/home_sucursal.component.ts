import { Component, OnInit } from '@angular/core';

interface Sucursal {
    nombre: string;
    direccion: string;
    telefono: string;
    jefeCocina: string;
    status: string;
}

interface Inventario {
    producto: string;
    unidad: number;
    capacidad: number;
    estatus: string;
    actualizado: string;
}

@Component({
    selector: 'app-home-sucursal',
    templateUrl: '../../html/Administrador/home_sucursales.html',
    styleUrls: ['../../css/home_sucursales.css']
})
export class HomeSucursalComponent implements OnInit {
    // Detalles de sucursal activa
    sucursal = {
        nombre: 'Centro',
        telefono: '(555) 123-45678',
        email: 'centro@kg.com',
        direccion: '9° a, Ac. 11 Sur #956',
        jefeCocina: 'P. Martínez',
        manager: 'J. Rodríguez',
        horario: '9:00 - 22:00',
        estatus: 'Activo'
    };

    // Lista de sucursales
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

    constructor() { }

    ngOnInit(): void { }

    editarSucursal() {
        alert('Función editar sucursal en construcción...');
    }
}
