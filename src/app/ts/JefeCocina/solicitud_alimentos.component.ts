import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrarPlatoService } from '../../services/JefeCocina/registrar-plato';
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

    modalVisible: boolean = false;
    modalTipo: 'exito' | 'error' = 'exito';
    modalTitulo: string = '';
    modalMensaje: string = '';

    constructor(
        private fb: FormBuilder,
        private registrarPlatoService: RegistrarPlatoService,
        private cookieService: CookieService,
        private router: Router
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

    enviarSolicitud() {
        alert('Solicitud enviada correctamente ✅');
    }

    cancelar() {
        alert('Solicitud cancelada ❌');
    }

    agregarProducto() {
        alert('Producto agregado ➕');
    }

    eliminarProducto() {
        alert('Producto eliminado ➖');
    }
}
