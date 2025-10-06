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
    imports: [ReactiveFormsModule,
    ]
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder,
        private cookieService: CookieService,
        private usuarioService: UsuarioService,
        private router: Router,
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
                    // Guardar token
                    this.cookieService.set('token', data.token, 1);

                    // Guardar id_usuario en localStorage
                    localStorage.setItem('id_usuario', JSON.stringify(data.usuario.id_usuario));

                    // Validar rol del usuario
                    if (data.usuario.id_rol == 1) {
                        this.router.navigateByUrl('/home_admin');
                    } else if (data.usuario.id_rol == 2) {
                        this.router.navigateByUrl('/home_jefe');
                    } else {
                        console.warn('Rol no reconocido:', data.usuario.id_rol);
                    }
                },
                error: (err) => {
                    console.error(' Error en el inicio de sesión:', err);
                }
            });
        } else {
            console.warn('Formulario inválido, revisa los campos.');
        }
    }


}
