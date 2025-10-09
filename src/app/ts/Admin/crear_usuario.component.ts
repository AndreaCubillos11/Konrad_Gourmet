import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../../services/Administrador/usuario-service';
import { SucursalService } from '../../services/Administrador/sucursal-service';
import { ModalNotificacionComponent } from '../../shared/modal-notificacion/modal-notificacion';

@Component({
    selector: 'app-crear-usuario',
    standalone: true,
    templateUrl: '../../html/Administrador/crear_usuario.html',
    styleUrls: ['../../css/crear_usuario.css'],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalNotificacionComponent]
})
export class CrearUsuarioComponent {

    usuarioForm!: FormGroup; // Se declara pero no se inicializa aún
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
            correo: ['', Validators.required],
            contrasena: ['', Validators.required],
            id_rol: [0, Validators.required],
            creador_id: [localStorage.getItem('id_usuario')],
            id_sucursal: [0, Validators.required]
        });
        this.cargarRoles();
        this.cargarSucursales();
    }


    cargarRoles(): void {
        this.usuarioService.consultarRoles(localStorage.getItem('id_usuario'), this.cookieService.get('token')).subscribe({
            next: (data) => {
                this.roles = data.roles;
            },
            error: (error) => {
                console.error('Error en consulta de roles', error);
            }
        });
    }

    cargarSucursales(): void {
        this.sucursalService.consultarSucursales(2, this.cookieService.get('token')).subscribe({
            next: (data) => {
                this.sucursales = data.sucursales;
                console.log(this.sucursales);
            },
            error: (error) => {
                console.error('Error en consulta de sucursales', error);
            }
        });
    }

    crearUsuario() {
        // ✅ Verificamos si el formulario es válido antes de enviar
        if (this.usuarioForm.invalid) {
            this.mostrarModal('advertencia', 'Formulario incompleto', 'Por favor, completa todos los campos requeridos.');
            return;
        }

        const token = this.cookieService.get('token');

        // ✅ Validamos que haya token
        if (!token) {
            this.mostrarModal('error', 'Error de autenticación', 'No se encontró un token válido. Inicia sesión nuevamente.');
            return;
        }
        console.log(this.usuarioForm.value);
        // ✅ Llamada al servicio
        this.usuarioService.crearUsuario(this.usuarioForm.value, token).subscribe({
            next: (respuesta) => {
                console.log('✅ Usuario creado:', respuesta);
                this.mostrarModal('exito', 'Éxito', 'Usuario creado correctamente.');
                this.usuarioForm.reset(); // Limpiamos el formulario tras crear el usuario
            },
            error: (error) => {
                this.mostrarModal('error', 'Error', 'No se pudo crear el usuario.');
            },
            complete: () => {
                console.log('ℹ️ Proceso de creación de usuario finalizado.');
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
