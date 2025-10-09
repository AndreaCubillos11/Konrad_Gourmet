import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegistrarPlatoService } from '../../services/JefeCocina/registrar-plato';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ModalNotificacionComponent } from '../../shared/modal-notificacion/modal-notificacion'; 

@Component({
    selector: 'app-agregar-plato',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ModalNotificacionComponent],
    templateUrl: '../../html/JefeCocina/agregar_plato.html',
    styleUrls: ['../../css/agregar_plato.css']
})
export class AgregarPlatoComponent implements OnInit {
    platoForm: FormGroup;

    categoriasPlato: any[] = [];
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
        this.platoForm = this.fb.group({
            nombre: ['', Validators.required],
            precio_venta: ['', Validators.required],
            id_categoria_plato: ['', Validators.required],
            ingredientes: this.fb.array([]),
            creador_id: [localStorage.getItem('id_usuario') || '']
        });
    }

    ngOnInit() {
        this.consultarCategoriaPlato();
        this.consultarCategoriaProducto();
        this.consultarUnidadMedida();
    }

    get ingredientes(): FormArray {
        return this.platoForm.get('ingredientes') as FormArray;
    }

    agregarIngrediente() {
        const ingrediente = this.fb.group({
            id_producto: ['', Validators.required],
            id_categoria_producto: ['', Validators.required],
            cantidad: ['', Validators.required],
            id_unidad: ['', Validators.required]
        });

        this.ingredientes.push(ingrediente);
        this.productosPorIngrediente.push([]); 
    }

    eliminarIngrediente(index: number) {
        this.ingredientes.removeAt(index);
        this.productosPorIngrediente.splice(index, 1); 
    }

    consultarCategoriaPlato() {
        const token = this.cookieService.get('token');
        this.registrarPlatoService.getCategoriasPlato(token, localStorage.getItem('id_usuario')).subscribe(
            data => this.categoriasPlato = data.catPlatos,
            error => console.error("Error al consultar categorías:", error)
        );
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

    consultarProductoPorCategoria(index: number) {
        const token = this.cookieService.get('token');
        const idUsuario = localStorage.getItem('id_usuario');

        const idCategoria = this.ingredientes.at(index).get('id_categoria_producto')?.value;
        if (idCategoria) {
            this.registrarPlatoService.getProductoPorCategoria(token, idUsuario, idCategoria).subscribe({
                next: (res) => {
                    this.productosPorIngrediente[index] = res.productos; 
                },
                error: (err) => {
                    console.error('Error al consultar productos por categoría:', err);
                }
            });
        }
    }

    registrarPlato() {
        const token = this.cookieService.get('token');
        this.registrarPlatoService.registrarPlato(this.platoForm.value, token).subscribe({
            next: () => {
                // Éxito → mostrar modal
                this.modalTipo = 'exito';
                this.modalTitulo = '¡Plato registrado!';
                this.modalMensaje = 'El plato ha sido registrado correctamente.';
                this.modalVisible = true;
            },
            error: (error) => {
                console.error("Error al registrar el plato:", error);
                // Error → mostrar modal
                this.modalTipo = 'error';
                this.modalTitulo = 'Error al registrar';
                this.modalMensaje = 'No fue posible registrar el plato. Intenta nuevamente.';
                this.modalVisible = true;
            }
        });
    }

    cerrarModal() {
        this.modalVisible = false;
        if (this.modalTipo === 'exito') {
            this.router.navigateByUrl('/jefe_menu');
        }
    }
}
