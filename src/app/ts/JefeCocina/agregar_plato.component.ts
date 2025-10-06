import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegistrarPlatoService } from '../../services/JefeCocina/registrar-plato';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-agregar-plato',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: '../../html/JefeCocina/agregar_plato.html',
    styleUrls: ['../../css/agregar_plato.css']
})
export class AgregarPlatoComponent implements OnInit {
    platoForm: FormGroup;

    categoriasPlato: any[] = [];
    categoriasProducto: any[] = [];
    unidades: any[] = [];

    //cada ingrediente tendrá su propio listado de productos
    productosPorIngrediente: any[][] = [];

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
        this.productosPorIngrediente.push([]); // se agrega un array vacío para este ingrediente
    }

    eliminarIngrediente(index: number) {
        this.ingredientes.removeAt(index);
        this.productosPorIngrediente.splice(index, 1); //  eliminar también sus productos
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
                    this.productosPorIngrediente[index] = res.productos; //  solo para ese ingrediente
                },
                error: (err) => {
                    console.error('Error al consultar productos por categoría:', err);
                }
            });
        }
    }

    registrarPlato() {
        const token = this.cookieService.get('token');
        this.registrarPlatoService.registrarPlato(this.platoForm.value, token).subscribe(
            () => {
                console.log("Plato registrado con éxito");
                this.router.navigateByUrl('/jefe_menu');
            },
            error => console.error("Error al registrar el plato:", error)
        );
    }
}
