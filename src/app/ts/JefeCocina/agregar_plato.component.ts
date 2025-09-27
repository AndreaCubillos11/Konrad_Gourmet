import { Component } from '@angular/core';

@Component({
    selector: 'app-agregar-plato',
    templateUrl: '../../html/JefeCocina/agregar_plato.html',
    styleUrls: ['../../css/agregar_plato.css']
})
export class AgregarPlatoComponent {
    nombrePlato: string = '';
    categoriaPlato: string = 'Plato Fuerte';
    producto: string = '';
    categoriaProducto: string = 'Granos';
    cantidad: number = 0;
    unidad: string = 'g';
    precio: string = '';

    agregarIngrediente() {
        alert(`Ingrediente agregado: ${this.producto} (${this.cantidad}${this.unidad})`);
    }

    eliminarIngrediente() {
        alert('Ingrediente eliminado');
    }

    guardarPlato() {
        alert(`✅ Plato guardado: ${this.nombrePlato}`);
    }

    cancelar() {
        alert('❌ Operación cancelada');
    }
}
