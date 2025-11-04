import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuditoriaService } from '../../services/Administrador/auditoria-service';
import { CommonModule } from '@angular/common';

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
    templateUrl: '../../html/Administrador/auditorias.html',
    styleUrls: ['../../css/auditorias.css'],
    imports: [FormsModule, CommonModule],
})
export class AuditoriasComponent {
    constructor(
        private cookieService: CookieService,
        private auditoriasService: AuditoriaService
    ) { }

    filtroFecha = '';
    filtroUsuario = '';
    eventoSeleccionado: Auditoria | null = null;

    eventos: any[] = [];
    eventosMostrados: any[] = [];

    //Getter que devuelve los eventos filtrados
    get eventosFiltrados(): any[] {
        return this.eventos.filter(
            (e) =>
                (!this.filtroFecha || e.fecha_hora?.startsWith(this.filtroFecha)) &&
                (!this.filtroUsuario ||
                    e.Usuario?.nombre
                        ?.toLowerCase()
                        .includes(this.filtroUsuario.toLowerCase()))
        );
    }

    //Se ejecuta al presionar el botón de filtrar
    filtrar() {
        this.eventoSeleccionado = null;
        // Si no hay filtros, mostrar todos
        if (!this.filtroFecha && !this.filtroUsuario) {
            this.eventosMostrados = [...this.eventos];
        } else {
            this.eventosMostrados = this.eventosFiltrados;
        }
    }

        limpiarFiltro() {
        this.filtroFecha = '';
        this.consultaAuditorias();
    }

    //Cuenta cuántas veces aparece una acción
    totalPorAccion(tipo: string): number {
        return this.eventos.filter(e => {
            const accion = (e.accion_registrada ?? '').toLowerCase();

            if (tipo === 'creacion') {
                return (
                    accion.includes('creado') ||
                    accion.includes('crear') ||
                    accion.includes('nuevo') // opcional
                );
            }

            if (tipo === 'actualizacion') {
                return (
                    accion.includes('actualizado') ||
                    accion.includes('modificado') ||
                    accion.includes('cambio') ||
                    accion.includes('editar')
                );
            }

            if (tipo === 'eliminacion') {
                return accion.includes('eliminado') || accion.includes('borrado');
            }

            return false;
        }).length;
    }


    ngOnInit(): void {
        this.consultaAuditorias();
    }

    //Carga las auditorías desde el servicio
    consultaAuditorias(): void {
        this.auditoriasService
            .consultarAuditorias(
                localStorage.getItem('id_usuario'),
                this.cookieService.get('token')
            )
            .subscribe({
                next: (data) => {
                    console.log('Auditorias cargadas:', data);
                    this.eventos = data.auditorias || [];
                    //Mostrar todas las auditorías inicialmente
                    this.eventosMostrados = [...this.eventos];
                },
                error: (error) => {
                    console.error('Error al cargar auditorias:', error);
                },
            });
    }
}
