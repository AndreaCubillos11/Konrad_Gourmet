import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ListasDesplegables } from '../../services/Administrador/listas-desplegables';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-crear-listas',
    templateUrl: '../../html/Administrador/crear_listas.html',
    styleUrls: ['../../css/crear_lista.css'],
    imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule] // 👈 aquí agregas los módulos que necesita el HTML
})
export class CrearListasComponent {

    catPlatoForm!: FormGroup;
    catProductoForm!: FormGroup;
    unidadForm!: FormGroup;
    productoForm!: FormGroup;
    opcionSeleccionada: string = '';
    etiquetaDinamica: string = 'Prueba';


    categorias = [
        { id: 1, nombre: 'Bebidas' },
        { id: 2, nombre: 'Lácteos' },
        { id: 3, nombre: 'Panadería' }
    ];

    marcas = [
        { id: 1, nombre: 'Marca A' },
        { id: 2, nombre: 'Marca B' },
        { id: 3, nombre: 'Marca C' }
    ];

    unidades = [
        { id: 1, nombre: 'Kg' },
        { id: 2, nombre: 'Litros' },
        { id: 3, nombre: 'Unidad' }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private listaDesplegables: ListasDesplegables,
        private cookieService: CookieService

    ) { }


    ngOnChanges() {
        this.cambiarEtiqueta();
    }

    ngOnInit(): void {
        this.catPlatoForm = this.formBuilder.group({
            categoria_Plato: [''],
            creador_id: [2]
        });

        this.catProductoForm = this.formBuilder.group({
            nombre_Categoria: [''],
            creador_id: [2]
        });

        this.unidadForm = this.formBuilder.group({
            nombre_Unidad: [''],
            creador_id: [2]
        });

        this.productoForm = this.formBuilder.group({
            nombre: [''],
            id_unidad: [0],
            id_categoria: [0],
            id_marca: [0]
        });

    }


    // Cada vez que cambia el select, se actualiza el label
    cambiarEtiqueta() {
        switch (this.opcionSeleccionada) {
            case 'categoria-plato':
                this.etiquetaDinamica = 'Categoría plato';
                break;
            case 'categoria-producto':
                this.etiquetaDinamica = 'Categoría producto';
                break;
            case 'unidad-medida':
                this.etiquetaDinamica = 'Unidad de medida';
                break;
            case 'producto':
                this.etiquetaDinamica = 'Producto';
                break;
            default:
                this.etiquetaDinamica = 'Sucursal';
                break;
        }
    }

    crearCategoriaPlato(): void {
        console.log(this.catPlatoForm.value); // aquí tienes categoria_Plato y creador_id

        this.listaDesplegables.nuevaCategoriaPlato(this.catPlatoForm.value, this.cookieService.get('token')).subscribe(
            () => {
                console.log("Categoría de plato registrada");
            },
            (error) => {
                console.error("Error:", error);
            }
        );
    }

    crearCategoriaProducto(): void {
        console.log(this.catProductoForm.value); // aquí tienes categoria_Plato y creador_id

        this.listaDesplegables.nuevaCategoriaPlato(this.catProductoForm.value, this.cookieService.get('token')).subscribe(
            () => {
                console.log("Categoría registrada");
            },
            (error) => {
                console.error("Error:", error);
            }
        );
    }

    crearUnidad(): void {
        console.log(this.unidadForm.value); // aquí tienes categoria_Plato y creador_id

        this.listaDesplegables.nuevaCategoriaPlato(this.unidadForm.value, this.cookieService.get('token')).subscribe(
            () => {
                console.log("Categoría registrada");
            },
            (error) => {
                console.error("Error:", error);
            }
        );
    }

    crearProducto(): void {
        console.log(this.productoForm.value); // aquí tienes categoria_Plato y creador_id

        this.listaDesplegables.nuevaCategoriaPlato(this.productoForm.value, this.cookieService.get('token')).subscribe(
            () => {
                console.log("Categoría registrada");
            },
            (error) => {
                console.error("Error:", error);
            }
        );
    }

    cancelar(): void {
        this.router.navigateByUrl('/admin/home_listas');
    }

}
