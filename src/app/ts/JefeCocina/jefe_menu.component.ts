import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarPlatoService } from '../../services/JefeCocina/registrar-plato';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'app-jefe-menu',
    templateUrl: '../../html/JefeCocina/jefe_menu.html',
    styleUrls: ['../../css/jefe_menu.css'],
    imports: [CommonModule]
})
export class JefeMenuComponent {

    platos: any[] = [];
    categoriasPlato: any[] = [];
    todosPlatos: any[] = [];
    platoForm!: FormGroup;


    constructor(
        private registrarPlatoService: RegistrarPlatoService,
        private cookieService: CookieService,
        private router: Router,
        private fb: FormBuilder,
    ) { }


    ngOnInit() {
        this.consultarPlatos();
        this.consultarCategoriaPlato();


        this.platoForm = this.fb.group({
            id_plato: ['', Validators.required],
            eliminador_id: [localStorage.getItem('id_usuario') || '']
        });
    }
    consultarPlatos() {
        console.log(localStorage.getItem('id_usuario'));
        this.registrarPlatoService.getPlatos(this.cookieService.get('token'), localStorage.getItem('id_usuario')).subscribe(

            data => {
                this.todosPlatos = data.platos;
                this.platos = data.platos;

            },
            error => console.error("Error consultando el menu:", error)
        )

    }

    consultarCategoriaPlato() {
        const token = this.cookieService.get('token');
        this.registrarPlatoService.getCategoriasPlato(token, localStorage.getItem('id_usuario')).subscribe(
            data => {
                this.categoriasPlato = data.catPlatos
                console.log(this.categoriasPlato);
            }
            ,
            error => console.error("Error al consultar categorías:", error)
        );
    }

    filtrarPorCategoria(categoria: string) {
        if (categoria === 'todos') {
            this.platos = this.todosPlatos;
        } else {
            this.platos = this.todosPlatos.filter(
                p => p.CategoriaPlato?.nombre_categoria === categoria
            );
        }
    }

    eliminarPlato(id: number) {

        this.platoForm.patchValue({
            id_plato: id
        });
        const token = this.cookieService.get('token');
        this.registrarPlatoService.eliminarPlato(this.platoForm.value, token).subscribe(() => {
            //   this.consultarPlatos(); // refrescar lista
            // });
        })

    }

}

