import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Comparacion {
  producto: string;
  proveedor: string;
  unidad: string;
  precioSipsa: number;
  precioCotizado: number;
  porcentaje: number;
  estado: 'OPCIONADA' | 'RECHAZADA' | 'SOSPECHOSA';
}

interface PrecioSipsa {
  producto: string;
  precio: number;
  unidad: string;
}

@Component({
  selector: 'app-comparar-cotizaciones',
  templateUrl: '../../html/DirectorCompras/comparar_cotizaciones.html',
  styleUrls: ['../../css/comparar_cotizaciones.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CompararCotizacionesComponent {
  constructor(private router: Router) {}

  // Datos de precios SIPSA
  preciosSipsa: PrecioSipsa[] = [
    { producto: 'Arroz (blanco)', precio: 2300, unidad: 'Kilogramo' },
    { producto: 'Fríjoles (rojos)', precio: 4100, unidad: 'Kilogramo' },
    { producto: 'Plátano (verde)', precio: 1100, unidad: 'Unidad' },
    { producto: 'Azúcar (blanca)', precio: 1800, unidad: 'Kilogramo' },
    { producto: 'Café (tostado)', precio: 3500, unidad: 'Kilogramo' },
  ];

  productosDisponibles: string[] = [
    'Arroz (blanco)',
    'Fríjoles (rojos)',
    'Plátano (verde)',
    'Azúcar (blanca)',
    'Café (tostado)',
  ];

  // Búsqueda
  busqueda = {
    productoProveedor: '',
  };

  // Nueva comparación
  nuevaComparacion = {
    producto: '',
    proveedor: '',
    unidad: '',
    precioCotizado: null as number | null,
  };

  // Comparaciones existentes
  comparaciones: Comparacion[] = [];
  mostrarFormularioComparacion = false;

  // Método para formatear números
  formatNumber(value: number): string {
    return value.toLocaleString('es-ES');
  }

  // Buscar comparación
  buscarComparacion() {
    this.nuevaComparacion.producto = this.busqueda.productoProveedor;
    this.mostrarFormularioComparacion = true;
  }

  // Agregar nueva comparación
  agregarComparacion() {
    // Validaciones
    if (!this.nuevaComparacion.producto) {
      alert('Por favor selecciona un producto');
      return;
    }
    if (!this.nuevaComparacion.proveedor) {
      alert('Por favor ingresa el nombre del proveedor');
      return;
    }
    if (!this.nuevaComparacion.unidad) {
      alert('Por favor selecciona una unidad');
      return;
    }
    if (!this.nuevaComparacion.precioCotizado || this.nuevaComparacion.precioCotizado <= 0) {
      alert('Por favor ingresa un precio válido');
      return;
    }

    // Obtener precio SIPSA
    const precioSipsa = this.obtenerPrecioSipsa(this.nuevaComparacion.producto);
    if (precioSipsa === 0) {
      alert('No se encontró precio SIPSA para este producto');
      return;
    }

    // Calcular porcentaje de diferencia
    const porcentaje = ((this.nuevaComparacion.precioCotizado! - precioSipsa) / precioSipsa) * 100;

    // Determinar el estado
    let estado: 'OPCIONADA' | 'RECHAZADA' | 'SOSPECHOSA' = 'OPCIONADA';
    if (porcentaje > 25) {
      estado = 'RECHAZADA';
    } else if (porcentaje < -50) {
      estado = 'SOSPECHOSA';
    }

    // Crear nueva comparación
    const nuevaComparacion: Comparacion = {
      producto: this.nuevaComparacion.producto,
      proveedor: this.nuevaComparacion.proveedor,
      unidad: this.nuevaComparacion.unidad,
      precioSipsa: precioSipsa,
      precioCotizado: this.nuevaComparacion.precioCotizado!,
      porcentaje: porcentaje,
      estado: estado,
    };

    // Agregar a la lista
    this.comparaciones.push(nuevaComparacion);

    // Limpiar formulario
    this.nuevaComparacion = {
      producto: '',
      proveedor: '',
      unidad: '',
      precioCotizado: null,
    };

    alert('Comparación agregada correctamente a la tabla');
  }

  // Obtener precio SIPSA
  obtenerPrecioSipsa(producto: string): number {
    const precioObj = this.preciosSipsa.find((p) => p.producto === producto);
    return precioObj ? precioObj.precio : 0;
  }

  // Obtener productos únicos
  get productosUnicos(): string[] {
    return [...new Set(this.comparaciones.map((comp) => comp.producto))];
  }

  // Obtener mejor precio por producto
  obtenerMejorPrecio(producto: string): number {
    const comparacionesProducto = this.comparaciones.filter((comp) => comp.producto === producto);
    if (comparacionesProducto.length === 0) return 0;
    return Math.min(...comparacionesProducto.map((comp) => comp.precioCotizado));
  }

  // Obtener mejor proveedor por producto
  obtenerMejorProveedor(producto: string): string {
    const comparacionesProducto = this.comparaciones.filter((comp) => comp.producto === producto);
    const mejorPrecio = this.obtenerMejorPrecio(producto);
    const mejorComparacion = comparacionesProducto.find((comp) => comp.precioCotizado === mejorPrecio);
    return mejorComparacion ? mejorComparacion.proveedor : 'No disponible';
  }

  // Estadísticas por estado
  obtenerCantidadOpcionadas(): number {
    return this.comparaciones.filter((comp) => comp.estado === 'OPCIONADA').length;
  }

  obtenerCantidadRechazadas(): number {
    return this.comparaciones.filter((comp) => comp.estado === 'RECHAZADA').length;
  }

  obtenerCantidadSospechosas(): number {
    return this.comparaciones.filter((comp) => comp.estado === 'SOSPECHOSA').length;
  }

  calcularTotalOpcionadas(): number {
    return this.comparaciones
      .filter((comp) => comp.estado === 'OPCIONADA')
      .reduce((total, comp) => total + comp.precioCotizado, 0);
  }

  // Generar orden de compra (solo para OPCIONADAS)
  generarOrdenCompra() {
    const opcionadas = this.comparaciones.filter((comp) => comp.estado === 'OPCIONADA');
    if (opcionadas.length === 0) {
      alert('No hay cotizaciones OPCIONADAS para generar la orden de compra.');
      return;
    }
    alert(
      `✅ Orden de compra generada para ${opcionadas.length} productos OPCIONADOS.\nTotal: $${this.formatNumber(
        this.calcularTotalOpcionadas()
      )}`
    );
  }
}
