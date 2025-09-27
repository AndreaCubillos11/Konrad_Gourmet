import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home-jefe',
    standalone: true,
    imports: [CommonModule],
    templateUrl: '../../html/JefeCocina/home_jefe.html',
    styleUrls: ['../../css/home_jefe.css']
})
export class HomeJefeComponent {
    // Valores de ejemplo estáticos para las tarjetas
    inventario = 120;
    menu = 45;
    pedidos = 32;

    constructor() { }

    // Métodos estáticos (solo muestran alertas)
    consultarInventario() {
        alert('Consultando inventario...');
    }

    nuevoPedido() {
        alert('Creando un nuevo pedido...');
    }

    cerrarSesion() {
        alert('Sesión cerrada.');
    }
}
