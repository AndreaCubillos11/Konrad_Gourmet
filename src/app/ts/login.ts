import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: '../html/login.html',
    standalone: true, // 👈 muy importante en Angular 17+
    imports: [ReactiveFormsModule] // 👈 para que funcione [formGroup]
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            usuario: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
    }
}
