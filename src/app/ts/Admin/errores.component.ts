import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ErroresService } from '../../services/Administrador/errores-service';
import { CommonModule } from '@angular/common';

interface ErrorCritico {
    id: string;
    tipo: string;
    fecha: string;
    descripcion: string;
}

@Component({
    selector: 'app-errors-admin',
    templateUrl: '../../html/Administrador/errores.html',
    styleUrls: ['../../css/errores.css'],
    imports: [FormsModule, CommonModule]
})
export class ErrorsComponent {

    constructor(
        private cookieService: CookieService,
        private erroresService: ErroresService
    ) { }


    filtroFecha: string = '';
    errorSeleccionado: any | null = null;

    erroresCriticos: any[] = [];
    erroresMostrados: any[] = [];

    filtrarPorFecha() {
        // Si no hay filtros, mostrar todos
        if (!this.filtroFecha) {
            this.erroresMostrados = [...this.erroresCriticos];
        } else {
            this.erroresMostrados = this.erroresFiltrados;
        }

    }

    get erroresFiltrados(): any[] {
        return this.erroresCriticos.filter(e => {
            const fechaEvento = e.fecha_hora ? e.fecha_hora.split('T')[0] : ''; // toma solo la fecha
            const coincideFecha = !this.filtroFecha || fechaEvento === this.filtroFecha;

            return coincideFecha;
        });
    }




    seleccionarError(error: any) {
        this.errorSeleccionado = error;
    }


    limpiarFiltro() {
        this.filtroFecha = '';
        this.errorSeleccionado = null;
        this.consultaErrores();
    }


    ngOnInit(): void {

        this.consultaErrores();
    }

    consultaErrores(): void {
        this.erroresService.consultarErrores(
            localStorage.getItem('id_usuario'),
            this.cookieService.get('token')
        )
            .subscribe({
                next: (data: any) => {
                    console.log('Errores cargados:', data);
                    this.erroresCriticos = data.errores || [];
                    this.erroresMostrados = [...this.erroresCriticos];
                },
                error: (error: any) => {
                    console.error('Error al cargar los errores:', error);
                },
            });
    }


}
