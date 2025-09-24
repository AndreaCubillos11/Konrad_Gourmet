import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-pedido',
  standalone: true, // Importante si usas Angular 15+
  imports: [CommonModule, FormsModule], // Aquí se habilitan *ngFor, ngIf, ngClass y ngModel
  templateUrl: '../../html/Mesero/agregar-pedido.html',
  styleUrls: ['../../css/agregar-pedido.css']
})
export class AgregarPedidoComponent {
  // Datos de prueba para la parte visual
  categorias = ['Entradas', 'Platos fuertes', 'Bebidas', 'Postres'];
  categoriaSeleccionada = 'Entradas';
  mesas = [1, 2, 3, 4, 5];
  mesaSeleccionada = 1;

  pedido = [
    { nombre: 'Pizza Margarita', cantidad: 1 },
    { nombre: 'Limonada', cantidad: 2 }
  ];

  getProductosPorCategoria() {
    return [
      { nombre: 'Producto 1' },
      { nombre: 'Producto 2' },
      { nombre: 'Producto 3' }
    ];
  }
}
