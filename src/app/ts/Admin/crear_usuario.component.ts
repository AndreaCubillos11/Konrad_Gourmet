import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../../services/Administrador/usuario-service';
import { SucursalService } from '../../services/Administrador/sucursal-service';
import { ModalNotificacionComponent } from '../../shared/modal-notificacion/modal-notificacion';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  templateUrl: '../../html/Administrador/crear_usuario.html',
  styleUrls: ['../../css/crear_usuario.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalNotificacionComponent, RouterModule]
})
export class CrearUsuarioComponent {
  usuarioForm!: FormGroup;
  roles: any[] = [];
  sucursales: any[] = [];

  modalVisible = false;
  modalTitulo = '';
  modalMensaje = '';
  modalTipo: 'exito' | 'error' | 'advertencia' | 'info' = 'info';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private sucursalService: SucursalService,
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d).+$')
        ]
      ],
      id_rol: [0, [Validators.required, Validators.min(1)]],
      creador_id: [localStorage.getItem('id_usuario')],
      id_sucursal: [0, [Validators.required, Validators.min(1)]]
    });

    this.cargarRoles();
    this.cargarSucursales();
  }

  cargarRoles(): void {
    this.usuarioService.consultarRoles(localStorage.getItem('id_usuario'), this.cookieService.get('token')).subscribe({
      next: (data) => this.roles = data.roles,
      error: (error) => console.error('Error en consulta de roles', error)
    });
  }

  cargarSucursales(): void {
    this.sucursalService.consultarSucursales(2, this.cookieService.get('token')).subscribe({
      next: (data) => this.sucursales = data.sucursales,
      error: (error) => console.error('Error en consulta de sucursales', error)
    });
  }

  crearUsuario() {
    if (this.usuarioForm.invalid) {
      this.mostrarModal('advertencia', 'Campos incompletos', 'Por favor, revisa los campos obligatorios y el formato del correo y contraseña.');
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const token = this.cookieService.get('token');
    if (!token) {
      this.mostrarModal('error', 'Error de autenticación', 'No se encontró un token válido. Inicia sesión nuevamente.');
      return;
    }

    this.usuarioService.crearUsuario(this.usuarioForm.value, token).subscribe({
      next: (respuesta) => {
        console.log('Usuario creado:', respuesta);
        this.mostrarModal('exito', 'Éxito', 'Usuario creado correctamente.');
        this.usuarioForm.reset();
      },
      error: (error) => {
        this.mostrarModal('error', 'Error', 'No se pudo crear el usuario.');
      },
      complete: () => console.log('✔ Proceso de creación de usuario finalizado.')
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
