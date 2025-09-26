import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   
import { FormsModule } from '@angular/forms';     

@Component({
    selector: 'app-crear-usuario',
    standalone: true,   
    templateUrl: '../../html/Administrador/crear_usuario.html',
    styleUrls: ['../../css/crear_usuario.css'],
    imports: [CommonModule, FormsModule]  
})
export class CrearUsuarioComponent {
    usuario = {
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        sucursal: '',
        cargo: '',
        notas: '',
        notifStock: false,
        notifPedidos: false,
        notifProveedores: false,
        permInventario: '',
        permCompras: '',
        permProveedores: '',
        accesoTemporal: '',
        sucursalSecundaria: ''
    };

    crearUsuario() {
        console.log("Usuario creado:", this.usuario);
        alert("Usuario creado correctamente");
    }
}
