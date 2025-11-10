import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface Promocion {
  producto: string;
  descuento: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
}

@Component({
  selector: 'app-promociones-tendencias',
  templateUrl: '../../html/DirectorComercial/promociones.html',
  styleUrls: ['../../css/promociones.css']
})
export class PromocionesComponent {

  // 🔍 Campos de formulario
  nuevaPromocion: Promocion = {
    producto: '',
    descuento: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'Activo'
  };

  constructor(private router: Router) { }

  // 📋 Lista inicial de promociones
  promociones: Promocion[] = [
    { producto: 'Ravioles', descuento: '20%', fechaInicio: '2025-09-01', fechaFin: '2025-09-10', estado: 'Terminado' },
    { producto: 'Risotto', descuento: '20%', fechaInicio: '2025-09-13', fechaFin: '2025-09-25', estado: 'Activo' },
    { producto: 'Papa boliviana', descuento: '15%', fechaInicio: '2025-09-18', fechaFin: '2025-09-30', estado: 'Activo' },
    { producto: 'Ajiaco', descuento: '10%', fechaInicio: '2025-08-28', fechaFin: '2025-08-31', estado: 'Terminado' },
    { producto: 'Sancocho', descuento: '2x1', fechaInicio: '2025-08-03', fechaFin: '2025-08-12', estado: 'Terminado' },
  ];

  // 🔎 Filtro de búsqueda
  filtroBusqueda: string = '';

  // 🔹 Estado de edición
  indiceEdicion: number | null = null;

  // 🧾 Guardar o editar promoción
  guardarPromocion() {
    if (this.indiceEdicion !== null) {
      this.promociones[this.indiceEdicion] = { ...this.nuevaPromocion };
      this.indiceEdicion = null;
    } else {
      this.promociones.push({ ...this.nuevaPromocion });
    }

    // Limpiar formulario
    this.nuevaPromocion = { producto: '', descuento: '', fechaInicio: '', fechaFin: '', estado: 'Activo' };
  }

  // ✏️ Editar promoción
  editarPromocion(index: number) {
    this.indiceEdicion = index;
    this.nuevaPromocion = { ...this.promociones[index] };
  }

  // 🔍 Buscar promoción
  get promocionesFiltradas() {
    return this.promociones.filter(p =>
      p.producto.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
    );
  }

  // 📤 Exportar datos a CSV
  exportarCSV() {
    const encabezados = ['Producto', 'Descuento', 'Fecha Inicio', 'Fecha Fin', 'Estado'];
    const filas = this.promociones.map(p =>
      [p.producto, p.descuento, p.fechaInicio, p.fechaFin, p.estado].join(',')
    );

    const contenido = [encabezados.join(','), ...filas].join('\n');
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'promociones.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  irATendencias() {
    this.router.navigate(['/directorComercial/tendencias']);
  }
}
