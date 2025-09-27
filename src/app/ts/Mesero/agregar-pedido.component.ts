import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  nombre: string;
}

interface Pedido {
  nombre: string;
  cantidad: number;
}

@Component({
  selector: 'app-agregar-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: '../../html/Mesero/agregar-pedido.html',
  styleUrls: ['../../css/agregar-pedido.css']
})
export class AgregarPedidoComponent {
  
  categorias = ['Entradas', 'Platos fuertes', 'Bebidas', 'Postres'];
  categoriaSeleccionada = 'Entradas';
  mesas = [1, 2, 3, 4, 5];
  mesaSeleccionada = 1;

  // Menú por categoría
  menu: { [key: string]: Producto[] } = {
    Entradas: [
      { nombre: 'Sopa de Tomate' },
      { nombre: 'Ensalada César' },
      { nombre: 'Bruschetta' }
    ],
    'Platos fuertes': [
      { nombre: 'Filete de Res' },
      { nombre: 'Pasta al Pesto' },
      { nombre: 'Risotto de Champiñones' }
    ],
    Bebidas: [
      { nombre: 'Coca-Cola' },
      { nombre: 'Jugo de Naranja' },
      { nombre: 'Café' }
    ],
    Postres: [
      { nombre: 'Tarta de Queso' },
      { nombre: 'Brownie' },
      { nombre: 'Helado de Vainilla' }
    ]
  };

  pedido: Pedido[] = [];

  // Productos filtrados
  getProductosPorCategoria(): Producto[] {
    return this.menu[this.categoriaSeleccionada] || [];
  }

  // Seleccionar tab
  seleccionarCategoria(cat: string) {
    this.categoriaSeleccionada = cat;
  }

  // Agregar al pedido
  agregar(producto: Producto) {
    const existente = this.pedido.find(p => p.nombre === producto.nombre);
    if (existente) {
      existente.cantidad++;
    } else {
      this.pedido.push({ nombre: producto.nombre, cantidad: 1 });
    }
  }

  // Incrementar
  incrementar(p: Pedido) {
    p.cantidad++;
  }

  // Disminuir
  disminuir(p: Pedido) {
    if (p.cantidad > 1) {
      p.cantidad--;
    } else {
      this.eliminar(p);
    }
  }

  // Eliminar
  eliminar(p: Pedido) {
    this.pedido = this.pedido.filter(item => item !== p);
  }

  // Enviar pedido
  enviarPedido() {
    console.log('Pedido enviado:', {
      mesa: this.mesaSeleccionada,
      detalle: this.pedido
    });
    alert(`Pedido de la mesa ${this.mesaSeleccionada} enviado con éxito ✅`);
    this.pedido = [];
  }
}
