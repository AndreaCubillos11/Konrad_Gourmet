import { Component } from '@angular/core';

@Component({
  selector: 'app-proveedores',
  templateUrl: '../../html/Administrador/home_proveedores.html',
  styleUrls: ['../../css/home_proveedores.css']
})
export class HomeProveedoresComponent {
  proveedores = [
    { nombre: 'FreshCo', nit: '123143243', telefono: '(555) 123-4567', email: 'ventas@fc.co', categoria: 'Producción', estatus: 'Activo' },
    { nombre: 'PrimeFood', nit: '586757545', telefono: '(555) 123-4567', email: 'ventas@pf.co', categoria: 'Despensa', estatus: 'Pendiente' },
    { nombre: 'OceanCatch', nit: '45370235', telefono: '(555) 123-4567', email: 'ventas@oc.co', categoria: 'Despensa', estatus: 'Activo' }
  ];

  pedidosSucursal = [
    { sucursal: 'Centro', proveedor: 'FreshCo', ordenes: 2, ultima: '01-06-2025' },
    { sucursal: 'Norte', proveedor: 'Prime Food', ordenes: 1, ultima: '01-07-2025' }
  ];

  proveedorSeleccionado = {
    nombre: 'FreshCo',
    nit: '123456789-Produce',
    contacto: 'Alex Rivera',
    telefono: '(555) 111-2222',
    email: 'Alex@freshco.com',
    rol: 'Gerente de cuenta',
    metodo: 'Transferencia',
    entregas: 15,
    aTiempo: 395,
    promedio: 2.34
  };
}
