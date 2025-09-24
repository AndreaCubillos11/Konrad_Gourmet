import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultar-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../html/Mesero/consultarPedido.html',
  styleUrls: ['../../css/consultarPedido.css']
})
export class ConsultarPedidoComponent {
  // Aquí en el futuro puedes manejar pedidos dinámicos
}
