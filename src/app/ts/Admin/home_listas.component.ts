import { Component } from '@angular/core';

@Component({
    selector: 'app-home-listas',
    templateUrl: '../../html/Administrador/home_listas.html',
    styleUrls: ['../../css/home_listas.css']
})
export class HomeListasComponent {
    categorias = [
        { nombre: 'Producto', codigo: 'CAT-PRO', activo: 'Sí' },
        { nombre: 'Despensa', codigo: 'CAT-PAN', activo: 'Sí' },
        { nombre: 'Mariscos', codigo: 'CAT-CEA', activo: 'Sí' },
    ];

    detalle = {
        nombre: 'Producto',
        codigo: 'CAT-PRO',
        descripcion: 'Frutas :)',
        estado: 'Activo'
    };

    cambios = [
        { fecha: '01-09-2025', usuario: 'A. Patel', accion: 'Actualización', detalles: 'Cambio de categoría' }
    ];

    verCategoria(cat: any) {
        this.detalle = {
            nombre: cat.nombre,
            codigo: cat.codigo,
            descripcion: 'Descripción temporal',
            estado: cat.activo === 'Sí' ? 'Activo' : 'Inactivo'
        };
    }
}
