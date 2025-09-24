import { Component } from '@angular/core';

@Component({
  selector: 'app-registrar-proveedor',
  templateUrl: '../../html/Administrador/registrar_proveedor.html',
  styleUrls: ['../../css/registrar_proveedor.css']
})
export class RegistrarProveedorComponent {

  cancelar() {
    alert('Operación cancelada');
  }

  crearProveedor() {
    alert('Proveedor creado correctamente');
  }

}
