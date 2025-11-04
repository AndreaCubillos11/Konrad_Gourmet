import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { SucursalService } from '../../services/Administrador/sucursal-service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/Administrador/usuario-service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { ModalNotificacionComponent } from '../../shared/modal-notificacion/modal-notificacion'; 

@Component({
    selector: 'app-registrar-sucursal',
    standalone: true,
    templateUrl:'../../html/Administrador/registrar_sucursal.html',
    styleUrls: ['../../css/registrar_sucursal.css'],
    imports: [ReactiveFormsModule, CommonModule, RouterModule, ModalNotificacionComponent]
})
export class RegistrarSucursalComponent implements OnInit {

    sucursalForm!: FormGroup; // Se declara pero no se inicializa aún
    usuarios: any[] = []
    correoSeleccionado: string = '';

    modalVisible: boolean = false;
    modalTipo: 'exito' | 'error' = 'exito';
    modalTitulo: string = '';
    modalMensaje: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private sucursalService: SucursalService,
        private usuarioService: UsuarioService,
        private cookieService: CookieService
    ) { }

    ngOnInit(): void {
        this.sucursalForm = this.formBuilder.group({
            nombre: [''],
            direccion: [''],
            telefono: [''],
            id_usuario: [0],
            creador_id: [2]
        });
        this.cargarUsuarios();
    }

    cancelar(): void {
        console.log('Acción: Cancelar registro');
        // aquí puedes navegar a home_sucursales
    }

// En tu componente (por ejemplo, SucursalComponent.ts)

// En tu componente (e.g., SucursalComponent.ts)

crear(): void {
    // VALIDACIÓN DE FORMULARIO: Dato faltante
    if (this.sucursalForm.invalid) {
        this.modalTipo = 'error';
        this.modalTitulo = 'Formulario Incompleto';
        this.modalMensaje = 'Por favor, completa todos los campos requeridos antes de registrar la sucursal';
        this.modalVisible = true;
        // Opcional: Marcar todos los campos como "touched" para mostrar errores en el HTML
        this.sucursalForm.markAllAsTouched();
        return; // Detiene la ejecución si el formulario es inválido
    }

    const sucursalData = this.sucursalForm.value;
    const token = this.cookieService.get('token');

    this.sucursalService.nuevaSucursal(sucursalData, token).subscribe({
        
        // Manejo de Éxito
        next: () => {
            console.log("Sucursal registrada");
            this.modalTipo = 'exito';
            this.modalTitulo = '¡Sucursal registrada!';
            this.modalMensaje = 'La sucursal ha sido registrada correctamente.';
            this.modalVisible = true;
            // Opcional: Actualizar la lista de sucursales o navegar
        },
        
        // Manejo de Errores de la API (Datos Repetidos, Rol Incorrecto, etc.)
        error: (error) => {
            console.error("Error al registrar la sucursal:", error);
            
            this.modalTipo = 'error';
            this.modalTitulo = 'Error al registrar';

            // Lógica para identificar el error específico del backend
            if (error.status === 409) { // 409 Conflict: Usado comúnmente para datos repetidos
                this.modalMensaje = 'El nombre o algún dato clave de esta sucursal ya se encuentra registrado.';
            } else if (error.status === 403 || error.error.message.includes('Rol no permitido')) { 
                // 403 Forbidden o mensaje específico para error de rol
                this.modalMensaje = 'El usuario asignado no tiene el rol de Jefe de Cocina. Por favor, selecciona un usuario válido.';
            } else {
                this.modalMensaje = 'Ocurrió un error inesperado al intentar registrar la sucursal. Intenta de nuevo.';
            }

            this.modalVisible = true;
        }
    });
}

    cargarUsuarios(): void {
        this.usuarioService.consultarUsuarios(2, this.cookieService.get('token')).subscribe({
            next: (data) => {
                this.usuarios = data.usuarios;
                console.log(this.usuarios);
            },
            error: (error) => {
                console.error('Error en consultar los usuarios', error);
            }
        });
    }

    actualizarCorreo(event: Event): void {
        const id = +(event.target as HTMLSelectElement).value;
        const seleccionado = this.usuarios.find(u => u.id_usuario === id);
        console.log(id);
        console.log(seleccionado);
        this.correoSeleccionado = seleccionado ? seleccionado.correo : '';
    }

    cerrarModal() {
        this.modalVisible = false;
        if (this.modalTipo === 'exito') {
            this.router.navigateByUrl('/admin/home_sucursal/:id');
        }
    }

    cancelarFormulario(): void {
        this.router.navigate(['/admin/home_sucursal/:id']);
    }
}
