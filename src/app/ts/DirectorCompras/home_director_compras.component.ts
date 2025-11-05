import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Agrega esta importación


interface Precio {
  producto: string;
  sucursal: string;
  fecha: string;
  unidad: string;
  precio: string;
}

@Component({
  selector: 'app-home',
  standalone: true,  // Asegúrate de que esté en true si es standalone
  templateUrl: '../../html/DirectorCompras/home_director_compras.html',
  styleUrls: ['../../css/home_director_compras.css'],
  imports: [CommonModule] 
})
export class HomeDirectorComprasComponent {
  constructor(private router: Router) { }

  precios: Precio[] = [
    { producto: 'Arroz (blanco)', sucursal: 'Norte', fecha: '2025-09-01', unidad: 'Kilogramo', precio: '$23,000' },
    { producto: 'Fríjoles (rojos)', sucursal: 'Sur', fecha: '2025-09-01', unidad: 'Kilogramo', precio: '$41,000' },
    { producto: 'Plátano (verde)', sucursal: 'Centro', fecha: '2025-09-01', unidad: 'Unidad', precio: '$11,000' }
  ];

  cotizaciones = [
    { id: '#10001', proveedor: 'Distribuidora Andina', fecha: '01-sep-25', total: '$520.000' },
    { id: '#10002', proveedor: 'Abastecimientos SAS', fecha: '02-sep-25', total: '$310.000' },
    { id: '#10003', proveedor: 'Proveedora Norte', fecha: '03-sep-25', total: '$450.000' }
  ];

  filtro = {
    producto: '',
    sucursal: '',
    fecha: ''
  };

  resultados: Precio[] = [...this.precios];

  // Métodos para manejar cambios en los filtros
  onProductoChange(event: any) {
    this.filtro.producto = event.target.value;
    this.filtrar();
  }

  onSucursalChange(event: any) {
    this.filtro.sucursal = event.target.value;
    this.filtrar();
  }

  onFechaChange(event: any) {
    this.filtro.fecha = event.target.value;
    this.filtrar();
  }

  filtrar() {
    this.resultados = this.precios.filter(item => {
      const coincideProducto = this.filtro.producto ? item.producto === this.filtro.producto : true;
      const coincideSucursal = this.filtro.sucursal ? item.sucursal === this.filtro.sucursal : true;
      const coincideFecha = this.filtro.fecha ? item.fecha === this.filtro.fecha : true;
      return coincideProducto && coincideSucursal && coincideFecha;
    });
  }

  // Formatear fecha para mostrar en formato más legible
  formatFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  nuevaConsulta() {
    this.filtro = { producto: '', sucursal: '', fecha: '' };
    this.resultados = [...this.precios];

    // Limpiar los valores de los selects
    const productoSelect = document.getElementById('producto') as HTMLSelectElement;
    const sucursalSelect = document.getElementById('sucursal') as HTMLSelectElement;
    const fechaInput = document.getElementById('fecha') as HTMLInputElement;

    if (productoSelect) productoSelect.value = '';
    if (sucursalSelect) sucursalSelect.value = '';
    if (fechaInput) fechaInput.value = '';
  }

  verTodasCotizaciones() {
    this.router.navigate(['/comparar-cotizaciones']);
  }
}