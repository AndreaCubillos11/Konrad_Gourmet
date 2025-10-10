import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'home-inventarios',
    standalone: true,
    imports: [CommonModule, RouterModule], 
    templateUrl: '../../html/Administrador/agregar_inventario.html',
    styleUrls: ['../../css/agregar_inventario.css']
})
export class AgregarInventarioComponent { }