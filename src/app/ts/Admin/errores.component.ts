import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ErrorCritico {
    id: string;
    tipo: string;
    fecha: string;
    hora: string;
    descripcion: string;
    modulo: string;
    origen: string;
}

@Component({
    selector: 'app-errors-admin',
    templateUrl:'../../html/Administrador/errores.html',
    styleUrls: ['../../css/errores.css'],
    imports: [FormsModule]
})
export class ErrorsComponent {
    filtroFecha: string = '';
    errorSeleccionado: ErrorCritico | null = null;

    erroresCriticos: ErrorCritico[] = [
        {
            id: 'ERR-001',
            tipo: 'Fallo de conexión',
            fecha: '2025-11-03',
            hora: '14:21',
            descripcion: 'No se pudo conectar al servidor de autenticación. Código: ECONNREFUSED.',
            modulo: 'Autenticación',
            origen: 'API Auth Server'
        },
        {
            id: 'ERR-002',
            tipo: 'Caída de servicio',
            fecha: '2025-11-03',
            hora: '11:42',
            descripcion: 'El servicio de reportes dejó de responder durante 10 minutos.',
            modulo: 'Reportes',
            origen: 'Servicio Backend Reports'
        },
        {
            id: 'ERR-003',
            tipo: 'Timeout en base de datos',
            fecha: '2025-11-02',
            hora: '19:05',
            descripcion: 'Timeout en consulta de inventario principal. Duración: 30s.',
            modulo: 'Inventario',
            origen: 'ClusterDB-02'
        },
        {
            id: 'ERR-004',
            tipo: 'Excepción no controlada',
            fecha: '2025-11-01',
            hora: '08:18',
            descripcion: 'NullPointerException en proceso de pagos automáticos.',
            modulo: 'Pagos',
            origen: 'Servicio de Cobros'
        }
    ];

    filtrarPorFecha() {
        if (!this.filtroFecha) return;
        this.errorSeleccionado = null;
        this.erroresCriticos = this.erroresCriticos.filter(e => e.fecha === this.filtroFecha);
    }

    limpiarFiltro() {
        this.filtroFecha = '';
        this.errorSeleccionado = null;
        // En un entorno real se volvería a consultar al backend
    }

    seleccionarError(error: ErrorCritico) {
        this.errorSeleccionado = error;
    }
}
