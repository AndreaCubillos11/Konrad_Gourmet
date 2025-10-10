import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedores } from '../../services/Administrador/proveedores';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registrar-proveedor',
  standalone: true,
  templateUrl: '../../html/Administrador/registrar_proveedor.html',
  styleUrls: ['../../css/registrar_proveedor.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegistrarProveedorComponent {

  proveedorForm!: FormGroup; // Se declara pero no se inicializa aún

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
    this.proveedorService.crearProveedor(this.proveedorForm.value, this.cookieService.get('token'))
      .subscribe(
        () => {
          console.log("Proveedor registrado");
        },
        (err) => {
          console.error('Error al registrar el proveedor:', err);
        }
      );
  }



  cancelar() {
    alert('Operación cancelada');
  }

  crearProveedor() {
    alert('Proveedor creado correctamente');
  }

}
