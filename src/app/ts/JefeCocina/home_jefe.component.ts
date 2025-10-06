import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
    selector: 'app-home-jefe',
    standalone: true,
    imports: [CommonModule],
    templateUrl:'../../html/JefeCocina/home_jefe.html',
    styleUrls: ['../../css/home_jefe.css']
})
export class HomeJefeComponent {


    constructor(private router: Router) { }
    irAgregarPlato() {
        this.router.navigate(['/agregar_plato']);  
    }
    // Valores de ejemplo estáticos para las tarjetas
    inventario = 120;
    menu = 45;
    pedidos = 32;
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
