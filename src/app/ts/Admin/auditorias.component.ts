import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Auditoria {
    fecha: string;
    hora: string;
    usuario: string;
    accion: string;
    modulo: string;
    resultado: string;
    descripcion: string;
    ip: string;
    sesion: string;
}

@Component({
    selector: 'app-auditorias-admin',
    templateUrl:'../../html/Administrador/auditorias.html',
    styleUrls: ['../../css/auditorias.css'],
    imports: [FormsModule]
})
export class AuditoriasComponent {
    filtroFecha = '';
    filtroUsuario = '';
    eventoSeleccionado: Auditoria | null = null;

    eventos: Auditoria[] = [
        {
            fecha: '2025-11-03',
            hora: '14:22',
            usuario: 'A. Patel',
            accion: 'Actualización',
            modulo: 'Listas desplegables',
            resultado: 'Exitoso',
            descripcion: 'Actualizó categorías del producto CAT-PR a CAT-PR02.',
            ip: '192.168.1.11',
            sesion: 'SID-9F22A'
        },
        {
            fecha: '2025-11-03',
            hora: '10:04',
            usuario: 'S. Chen',
            accion: 'Creación',
            modulo: 'Proveedores',
            resultado: 'Exitoso',
            descripcion: 'Se agregó un nuevo proveedor: Distribuidora Central.',
            ip: '192.168.1.12',
            sesion: 'SID-8A55B'
        },
        {
            fecha: '2025-11-02',
            hora: '18:34',
            usuario: 'Sistema',
            accion: 'Auto-Archivado',
            modulo: 'Inventario',
            resultado: 'Automático',
            descripcion: 'Inventarios antiguos fueron archivados.',
            ip: '192.168.1.10',
            sesion: 'SYS-ARCH'
        },
        {
            fecha: '2025-11-02',
            hora: '09:12',
            usuario: 'J. Rivera',
            accion: 'Eliminación',
            modulo: 'Usuarios y Roles',
            resultado: 'Exitoso',
            descripcion: 'Se eliminó el usuario temporal de pruebas.',
            ip: '192.168.1.15',
            sesion: 'SID-777B2'
        }
    ];

    get eventosFiltrados(): Auditoria[] {
        return this.eventos.filter(
            e =>
                (!this.filtroFecha || e.fecha === this.filtroFecha) &&
                (!this.filtroUsuario ||
                    e.usuario.toLowerCase().includes(this.filtroUsuario.toLowerCase()))
        );
    }

    verDetalle(evento: Auditoria) {
        this.eventoSeleccionado = evento;
    }

    filtrar() {
        this.eventoSeleccionado = null;
    }

    totalPorAccion(accion: string): number {
        return this.eventos.filter(e => e.accion.includes(accion)).length;
    }

    exportarPDF() {
        alert('Exportando reporte de auditorías en PDF...');
    }
}
