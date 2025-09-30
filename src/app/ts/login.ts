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
                    this.cookieService.set('token', data.token, 1);
                    if (data.usuario.id_rol == 1) {
                        localStorage.setItem('id_usuario', JSON.stringify(data.usuario.id_usuario));
                        this.router.navigateByUrl('/home_admin');
                    }
                },
                error: (err) => {
                    console.error('❌ Error en el inicio de sesión:', err);
                }
            });
        } else {
            console.warn('⚠️ Formulario inválido, revisa los campos.');
        }
    }

}
