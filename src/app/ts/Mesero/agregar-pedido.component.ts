import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pedido } from '../../services/Mesero/pedido';
import { RegistrarPlatoService } from '../../services/JefeCocina/registrar-plato';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ModalNotificacionComponent } from '../../shared/modal-notificacion/modal-notificacion'; 

@Component({
  selector: 'app-agregar-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalNotificacionComponent], 
  templateUrl: '../../html/Mesero/agregar-pedido.html',
  styleUrls: ['../../css/agregar-pedido.css']
})
export class AgregarPedidoComponent implements OnInit {

  platos: any[] = [];
  categoriasPlato: any[] = [];
  todosPlatos: any[] = [];
  pedido: any[] = [];
  mesas: number[] = [1,2,3,4,5,6,7,8,9,10];
  mesaSeleccionada: number | null = null;
  idUsuario: string | null = '';

  modalVisible = false;
  modalTitulo = '';
  modalMensaje = '';
  modalTipo: 'exito' | 'error' | 'advertencia' | 'info' = 'info';

  constructor(
    private pedidoService: Pedido,
    private cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder,
    private registrarPlatoService: RegistrarPlatoService
  ) {}

  ngOnInit() {
    this.idUsuario = localStorage.getItem('id_usuario');
    this.consultarPlatos();
    this.consultarCategoriaPlato();
  }

  consultarPlatos() {
    const token = this.cookieService.get('token');
    if (!token || !this.idUsuario) return;

    this.registrarPlatoService.getPlatos(token, this.idUsuario).subscribe(
      data => {
        this.todosPlatos = data.platos || [];
        this.platos = [...this.todosPlatos];
      },
      error => console.error('Error consultando el menú:', error)
    );
  }

  consultarCategoriaPlato() {
    const token = this.cookieService.get('token');
    if (!token || !this.idUsuario) return;

    this.registrarPlatoService.getCategoriasPlato(token, this.idUsuario).subscribe(
      data => this.categoriasPlato = data.catPlatos || [],
      error => console.error('Error al consultar categorías:', error)
    );
  }

  filtrarPorCategoria(categoria: string) {
    this.platos = categoria === 'todos'
      ? [...this.todosPlatos]
      : this.todosPlatos.filter(p => p.CategoriaPlato?.nombre_categoria === categoria);
  }

  agregar(plato: any) {
    const existente = this.pedido.find(p => p.id_plato === plato.id_plato);
    if (existente) {
      existente.cantidad++;
    } else {
      this.pedido.push({ id_plato: plato.id_plato, nombre: plato.nombre, cantidad: 1 });
    }
  }

  incrementar(plato: any) {
    plato.cantidad++;
  }

  disminuir(plato: any) {
    if (plato.cantidad > 1) plato.cantidad--;
    else this.eliminar(plato);
  }

  eliminar(plato: any) {
    this.pedido = this.pedido.filter(item => item.id_plato !== plato.id_plato);
  }

  enviarPedido() {
    const token = this.cookieService.get('token');
    if (!token || !this.mesaSeleccionada || this.pedido.length === 0) {
      this.mostrarModal('error', 'Error', 'Debes seleccionar una mesa y agregar platos antes de enviar.');
      return;
    }

    const nuevoPedido = {
      id_usuario: this.idUsuario,
      numero_mesa: this.mesaSeleccionada,
      fecha_hora: new Date().toISOString(),
      id_sucursal: 1,
      platos: this.pedido
    };

    this.pedidoService.registrarPedido(nuevoPedido, token).subscribe(
      response => {
        console.log('Pedido enviado con éxito:', response);
        this.mostrarModal('exito', 'Éxito', 'El pedido fue enviado correctamente');
        this.pedido = [];
        this.mesaSeleccionada = null;
      },
      error => {
        console.error('Error al enviar el pedido:', error);
        this.mostrarModal('error', 'Error', 'No se pudo enviar el pedido. Intente nuevamente.');
      }
    );
  }

  // Mostrar modal de notificación
  mostrarModal(tipo: 'exito' | 'error' | 'advertencia' | 'info', titulo: string, mensaje: string) {
    this.modalTipo = tipo;
    this.modalTitulo = titulo;
    this.modalMensaje = mensaje;
    this.modalVisible = true;
  }

  // Cerrar modal
  cerrarModal() {
    this.modalVisible = false;
  }
}
