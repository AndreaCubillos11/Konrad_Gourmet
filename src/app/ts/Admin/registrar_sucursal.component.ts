import { Component } from '@angular/core';

@Component({
    selector: 'app-registrar-sucursal',
    templateUrl: '../../html/Administrador/registrar_sucursal.html',
    styleUrls: ['../../css/registrar_sucursal.css']
})
export class RegistrarSucursalComponent {

    // Datos iniciales de la sucursal
    sucursal = {
        nombre: '',
        codigo: '',
        region: '',
        estatus: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        pais: '',
        horario: '',
        notas: '',
        gerente: '',
        correo: '',
        telefono: '',
        respaldo: ''
    };

    cancelar(): void {
        console.log('Acción: Cancelar registro');
        // aquí puedes navegar a home_sucursales
    }

    crear(): void {
        console.log('Sucursal registrada:', this.sucursal);
        // aquí va la lógica para guardar en backend
    }
}
