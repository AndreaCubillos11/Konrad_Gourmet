import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: '../../html/Mesero/homeMesero.html',
  styleUrls: ['../../css/Mesero.css'] 
})
export class HomeComponent {


  pedidosEnCurso: number = 0;     
  mesasActivas: number = 0;

  constructor() {}

  consultarPedidos() {
    console.log('Consultando pedidos...');
    // lógica para consultar pedidos
  }

  nuevoPedido() {
    console.log('Nuevo pedido creado');
    // lógica para crear un nuevo pedido
  }
}
