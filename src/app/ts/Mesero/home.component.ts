import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Pedido } from '../../services/Mesero/pedido';

@Component({
  selector: 'app-home',
  templateUrl: '../../html/Mesero/homeMesero.html',
  styleUrls: ['../../css/Mesero.css']
})
export class HomeComponent {

  pedidos: any[] = [];
  pedidosEnCurso: number = 0;  
  mesasActivas: number = 0;

  ngOnInit() {
    this.cargarPedidos();

  }

  constructor(
    private pedidoService: Pedido,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  cargarPedidos(): void {
    const token = this.cookieService.get('token');

    this.pedidoService
      .getPedidos(token, localStorage.getItem('id_usuario'), localStorage.getItem('id_sucursal'))
      .subscribe({
        next: (data) => {
          console.log('Pedidos cargados:', data);
          this.pedidos = data.pedidos; // Ajuste según la respuesta de tu API
        },
        error: (error) => {
          console.error('Error al cargar pedidos:', error);
        }
      });
  }
  nuevoPedido() {
    console.log('Nuevo pedido creado');
    // lógica para crear un nuevo pedido
  }

  consultarPedidos() {
    this.router.navigate(['/consultar_pedido']);
  }
}
