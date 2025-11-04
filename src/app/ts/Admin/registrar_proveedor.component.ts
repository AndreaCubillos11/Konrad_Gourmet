import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedores } from '../../services/Administrador/proveedores';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalNotificacionComponent } from '../../shared/modal-notificacion/modal-notificacion';


@Component({
  selector: 'app-registrar-proveedor',
  standalone: true,
  templateUrl: '../../html/Administrador/registrar_proveedor.html',
  styleUrls: ['../../css/registrar_proveedor.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ModalNotificacionComponent]
})
export class RegistrarProveedorComponent {

  proveedorForm!: FormGroup; // Se declara pero no se inicializa aún

  modalVisible: boolean = false;
  modalTipo: 'exito' | 'error' = 'exito';
  modalTitulo: string = '';
  modalMensaje: string = '';

  constructor(
    private router: Router,
    private proveedorService: Proveedores,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.proveedorForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      ciudad: ['', Validators.required],
      nit: ['', Validators.required],
      creador_id: [localStorage.getItem('id_usuario')]
    });
  }

registrarProveedor() {
  // Validar formulario antes de enviar
  if (this.proveedorForm.invalid) {
    this.proveedorForm.markAllAsTouched(); // Marca los campos para mostrar errores visuales

    // Mostrar modal de error
    this.modalTipo = 'error';
    this.modalTitulo = 'Formulario No válido';
    this.modalMensaje = 'Por favor, complete todos los campos correctamente antes de registrar al proveedor.';
    this.modalVisible = true;
    return;
  }

  const token = this.cookieService.get('token');

  this.proveedorService.crearProveedor(this.proveedorForm.value, token).subscribe({
    next: () => {
      console.log("Proveedor registrado con éxito");

      // Modal de éxito
      this.modalTipo = 'exito';
      this.modalTitulo = '¡Proveedor registrado!';
      this.modalMensaje = 'El proveedor ha sido registrado correctamente.';
      this.modalVisible = true;

      // Opcional: resetear formulario tras el éxito
      this.proveedorForm.reset();
    },
    error: (err) => {
      console.error('Error al registrar el proveedor:', err);

      // Modal de error
      this.modalTipo = 'error';
      this.modalTitulo = 'Error al registrar';
      this.modalMensaje = 'No fue posible registrar el proveedor. Verifique los datos e intente nuevamente.';
      this.modalVisible = true;
    }
  });
}


  cerrarModal() {
    this.modalVisible = false;
    if (this.modalTipo === 'exito') {
      this.router.navigateByUrl('admin/home_proveedores');
    }
  }

  cancelar() {
    alert('Operación cancelada');
  }

  crearProveedor() {
    alert('Proveedor creado correctamente');
  }

  cancelarRegistro(): void {
        this.router.navigate(['/admin/home_proveedores']); 
    }

}
