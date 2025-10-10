import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrarPlatoService } from '../../services/JefeCocina/registrar-plato';
import { Solicitudes } from '../../services/JefeCocina/solicitudes';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalNotificacionComponent } from '../../shared/modal-notificacion/modal-notificacion';

@Component({
    selector: 'app-solicitud-alimentos',
    templateUrl: '../../html/JefeCocina/solicitud_alimentos.html',
    styleUrls: ['../../css/solicitud_alimentos.css'],
    imports: [CommonModule, ReactiveFormsModule, ModalNotificacionComponent]
})
export class SolicitudAlimentosComponent {

    solicitudForm: FormGroup;

    categoriasProducto: any[] = [];
    unidades: any[] = [];
    productosPorIngrediente: any[][] = [];
    marcas: any[] = [];

    modalVisible: boolean = false;
    modalTipo: 'exito' | 'error' = 'exito';
    modalTitulo: string = '';
    modalMensaje: string = '';

    constructor(
        private fb: FormBuilder,
        private registrarPlatoService: RegistrarPlatoService,
        private cookieService: CookieService,
        private router: Router,
        private solicitudeService: Solicitudes
    ) {
        this.solicitudForm = this.fb.group({
            cantidad: [0, Validators.required],
            id_producto: [0, Validators.required],
            id_sucursal: localStorage.getItem('id_sucursal'),
            id_usuario: localStorage.getItem('id_usuario'),
            id_categoriaProducto: [0, Validators.required],
            id_unidadMedida: [0, Validators.required],
            id_marca: [0]
        });
    }

    ngOnInit() {
        this.consultarCategoriaProducto();
        this.consultarUnidadMedida();
        this.consultarMarca();
    }


    consultarCategoriaProducto() {
        const token = this.cookieService.get('token');
        const idUsuario = localStorage.getItem('id_usuario');
        this.registrarPlatoService.getCategoriasProducto(token, idUsuario).subscribe({
            next: (data) => this.categoriasProducto = data.catProductos,
            error: (err) => console.error('Error al consultar categorías de productos:', err)
        });
    }

    consultarUnidadMedida() {
        const token = this.cookieService.get('token');
        this.registrarPlatoService.getUnidades(token, localStorage.getItem('id_usuario')).subscribe(
            (data: any) => this.unidades = data.catUnidad,
            error => console.error("Error al consultar unidades:", error)
        );
    }

    consultarProductoPorCategoria(idCategoria: number) {
        const token = this.cookieService.get('token');
        const idUsuario = localStorage.getItem('id_usuario');

        if (idCategoria) {
            this.registrarPlatoService.getProductoPorCategoria(token, idUsuario, idCategoria).subscribe({
                next: (res) => {
                    // almacenamos productos por categoría
                    this.productosPorIngrediente[idCategoria] = res.productos;
                    console.log("Productos cargados para la categoría:", idCategoria, res.productos);
                },
                error: (err) => {
                    console.error('Error al consultar productos por categoría:', err);
                }
            });
        }
    }

    consultarMarca() {
        const token = this.cookieService.get('token');
        this.registrarPlatoService.getMarcas(token, localStorage.getItem('id_usuario')).subscribe(
            (data: any) => this.marcas = data.marcas,
            error => console.error("Error al consultar marcas:", error)
        );

    }
    enviarSolicitud() {

        const token = this.cookieService.get('token');
        this.solicitudeService.registrarSolicitud(this.solicitudForm.value, token).subscribe({
            next: () => {
                // Éxito → mostrar modal
                this.modalTipo = 'exito';
                this.modalTitulo = '¡Solicitud Enviada!';
                this.modalMensaje = 'La solicitud se ha enviado correctamente.';
                this.modalVisible = true;
            },
            error: (error) => {
                console.error("Error al enviar la solicitud:", error);
                // Error → mostrar modal
                this.modalTipo = 'error';
                this.modalTitulo = 'Error al enviar';
                this.modalMensaje = 'No fue posible enviar la solicitud. Intenta nuevamente.';
                this.modalVisible = true;
            }
        });


    }

    

    cancelar() {
        alert('Solicitud cancelada');
    }

        cerrarModal() {
        this.modalVisible = false;
        if (this.modalTipo === 'exito') {
            this.router.navigateByUrl('/jefe_menu');
        }
    }
}




