import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-notificacion',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './modal-notificacion.html', 
  styleUrls: ['./modal-notificacion.css']
})
export class ModalNotificacionComponent {
  @Input() visible = false;
  @Input() tipo: 'exito' | 'error' | 'advertencia' | 'info' = 'info';
  @Input() titulo = '';
  @Input() mensaje = '';

  @Output() cerrar = new EventEmitter<void>();

  onCerrar() {
    this.visible = false;
    this.cerrar.emit();
  }
}
