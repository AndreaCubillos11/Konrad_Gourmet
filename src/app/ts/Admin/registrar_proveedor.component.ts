import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedores } from '../../services/Administrador/proveedores';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-proveedor',
  templateUrl: '../../html/Administrador/registrar_proveedor.html',
  styleUrls: ['../../css/registrar_proveedor.css'],
  imports: [CommonModule]
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
      nit:['', Validators.required],
      creador_id: [localStorage.getItem('id_usuario')]
    });
  }


  cancelar() {
    alert('Operación cancelada');
  }

  crearProveedor() {
    alert('Proveedor creado correctamente');
  }

}
