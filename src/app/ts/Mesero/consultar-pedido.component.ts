import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Pedido } from '../../services/Mesero/pedido';
import { RegistrarPlatoService } from '../../services/JefeCocina/registrar-plato';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ModalNotificacionComponent } from '../../shared/modal-notificacion/modal-notificacion';
import { SucursalService } from '../../services/Administrador/sucursal-service';

@Component({
  selector: 'app-consultar-pedido',
  standalone: true,
  imports: [CommonModule, ModalNotificacionComponent],
  templateUrl: '../../html/Mesero/consultarPedido.html',
  styleUrls: ['../../css/consultarPedido.css']
})
export class ConsultarPedidoComponent implements OnInit {

  pedidos: any[] = [];

  modalVisible = false;
  modalTitulo = '';
  modalMensaje = '';
  modalTipo: 'exito' | 'error' | 'advertencia' | 'info' = 'info';

  constructor(
    private pedidoService: Pedido,
    private cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder,
    private registrarPlatoService: RegistrarPlatoService,
    private sucursalService: SucursalService,
  ) { }

  ngOnInit() {
    const token = this.cookieService.get('token');
    const idUsuario = localStorage.getItem('id_usuario');
    this.cargarPedidos(token, idUsuario);
  }

  cargarPedidos(token: string, idUsuario: any): void {
    this.pedidoService
      .getPedidos(token, idUsuario, localStorage.getItem('id_sucursal'))
      .subscribe({
        next: (data) => {
          console.log('Pedidos cargados:', data);
          this.pedidos = data.pedidos || [];
        },
        error: (error) => {
          console.error('Error al cargar pedidos:', error);

          // ✅ Detectamos si el backend respondió "No hay pedidos activos..."
          if (
            error.status === 404 &&
            error.error?.mensaje?.includes('No hay pedidos activos')
          ) {
            this.pedidos = []; // limpiamos la lista
            this.mostrarModal('info', 'Información', 'No hay pedidos activos para esta sucursal.');
          } else {
            this.mostrarModal('error', 'Error', 'No se pudieron cargar los pedidos.');
          }
        }
      });
  }

  actualizarEstado(idPedido: any): void {
    const pedidoActualizado = {
      estado: false,
      creador_id: localStorage.getItem('id_usuario')
    };

    const token = this.cookieService.get('token');

    if (!idPedido || !token) {
      this.mostrarModal('error', 'Error', 'No se pudo procesar la solicitud.');
      return;
    }

    this.pedidoService.actualizarEstado(pedidoActualizado, token, idPedido).subscribe({
      next: (respuesta) => {
        this.mostrarModal('exito', 'Éxito', 'El pedido fue marcado como entregado.');

        if (this.pedidos.length > 0) {
          this.cargarPedidos(token, localStorage.getItem('id_usuario'));
        }
      },
      error: (error) => {
        console.error("Error al actualizar pedido:", error);
        this.mostrarModal('error', 'Error', 'No se pudo actualizar el pedido.');
      }
    });
  }

  eliminarPedido(idPedido: any): void {
    const token = this.cookieService.get('token');
    const idUsuario = localStorage.getItem('id_usuario');

    if (!idPedido || !idUsuario || !token) {
      this.mostrarModal('error', 'Error', 'No se pudo eliminar el pedido.');
      return;
    }

    this.pedidoService.eliminarPedido(idUsuario, token, idPedido).subscribe({
      next: (respuesta) => {
        this.mostrarModal('exito', 'Éxito', 'El pedido fue cancelado correctamente.');
        this.cargarPedidos(token, localStorage.getItem('id_usuario'));
      },
      error: (error) => {
        console.error("Error al eliminar pedido:", error);
        this.mostrarModal('error', 'Error', 'No se pudo eliminar el pedido.');
      },
      complete: () => {
        console.log("ℹ Proceso de eliminación finalizado.");
      }
    });
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  mostrarModal(tipo: 'exito' | 'error' | 'advertencia' | 'info', titulo: string, mensaje: string) {
    this.modalTipo = tipo;
    this.modalTitulo = titulo;
    this.modalMensaje = mensaje;
    this.modalVisible = true;
  }
}
