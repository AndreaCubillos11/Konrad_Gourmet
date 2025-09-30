import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // 👈 importa esto
import { SucursalService } from '../../services/Administrador/sucursal-service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/Administrador/usuario-service';
import { CommonModule } from '@angular/common';  
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-registrar-sucursal',
    templateUrl: '../../html/Administrador/registrar_sucursal.html',
    styleUrls: ['../../css/registrar_sucursal.css'],
    imports: [ReactiveFormsModule, CommonModule] 
})
export class RegistrarSucursalComponent implements OnInit {

    sucursalForm!: FormGroup; // Se declara pero no se inicializa aún
    usuarios: any[] = []
    correoSeleccionado: string = '';

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

    crear(): void {

        // aquí va la lógica para guardar en backend con sucursalService
        console.log(this.sucursalForm.value)
        this.sucursalService.nuevaSucursal(this.sucursalForm.value,this.cookieService.get('token')).subscribe(
            () => {
                console.log("Sucursal registrada");
            },
            (error) => {
                console.error(error);
            }
        );
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
        this.correoSeleccionado = seleccionado ? seleccionado.correo:'';
    }
}
