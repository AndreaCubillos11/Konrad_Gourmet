import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../services/Administrador/usuario-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: '../html/login.html',
    styleUrls: ['../css/login.css'],
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private cookieService: CookieService,
        private usuarioService: UsuarioService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            correo: ['', Validators.required],
            contrasena: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.usuarioService.login(this.loginForm.value).subscribe({
                next: (data: any) => {
                    // Guardar token y usuario
                    this.cookieService.set('token', data.token, 1);
                    localStorage.setItem('id_usuario', JSON.stringify(data.usuario.id_usuario));
                    localStorage.setItem('id_rol', JSON.stringify(data.usuario.id_rol));
                    localStorage.setItem('id_sucursal', JSON.stringify(data.usuario.id_sucursal));

                    //Llamar al método para obtener roles por nombre
                    this.obtenerNombreRol(data.usuario.id_rol, data.token);
                },
                error: (err) => {
                    console.error('Error en el inicio de sesión:', err);
                }
            });
        } else {
            console.warn('Formulario inválido, revisa los campos.');
        }
    }

    /**
     * Consulta los roles desde la API y redirige según el nombre del rol.
     */
    private obtenerNombreRol(idRol: number, token: string): void {
        this.usuarioService.consultarRoles(localStorage.getItem('id_usuario'), token).subscribe({
            next: (data: any) => {
                // Buscar el rol correspondiente al id
                const rol = data.roles.find((r: any) => r.id_rol === idRol);

                if (rol) {
                    const nombreRol = rol.nombre_rol.toLowerCase();
                    localStorage.setItem('rol', rol.nombre_rol); // Guardar nombre de rol

                    //Redirección según el nombre del rol
                    if (nombreRol === 'administrador') {
                        this.router.navigateByUrl('/admin');
                    } else if (nombreRol === 'jefe de cocina') {
                        this.router.navigateByUrl('/home_jefe');
                    } else if (nombreRol === 'mesero') {
                        this.router.navigateByUrl('/mesero');
                    } else if (nombreRol === 'auxiliar de compras') {
                        this.router.navigateByUrl('/home_auxiliar');
                    } else {
                        console.warn('Rol no reconocido:', rol.nombre_rol);
                    }
                } else {
                    console.error('No se encontró un rol con el id:', idRol);
                }
            },
            error: (error) => {
                console.error('Error consultando roles:', error);
            }
        });
    }
}
