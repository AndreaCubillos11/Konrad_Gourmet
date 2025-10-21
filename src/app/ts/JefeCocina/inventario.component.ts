import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Inventario } from '../../services/JefeCocina/inventario';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-inventario',
    imports: [CommonModule],
    templateUrl: '../../html/JefeCocina/inventario.html',
    styleUrls: ['../../css/inventario.css']
})
export class InventarioComponent {

    inventario: any[] = [];
    inventarioPorCategoria: { [key: string]: any[] } = {};
    categoriasDisponibles: string[] = [];
    categoriaSeleccionada: string = 'Todas';

    constructor(
        private router: Router,
        private cookieService: CookieService,
        private inventarioService: Inventario
    ) { }

    ngOnInit() {
        this.consultarInventarioPorSucursal();
    }

    consultarInventarioPorSucursal() {
        const token = this.cookieService.get('token');
        const idUsuario = localStorage.getItem('id_usuario');
        const idSucursal = localStorage.getItem('id_sucursal');

        this.inventarioService.getInventarioPorSucursal(token, idUsuario, idSucursal).subscribe({
            next: (data) => {
                this.inventario = data;
                this.agruparPorCategoria();
            },
            error: (err) => console.error('Error al consultar el inventario:', err)
        });
    }

    agruparPorCategoria() {
        this.inventarioPorCategoria = {};
        this.inventario.forEach(item => {
            const categoria = item.Producto.CategoriaProducto.nombre_categoria;
            if (!this.inventarioPorCategoria[categoria]) {
                this.inventarioPorCategoria[categoria] = [];
            }
            this.inventarioPorCategoria[categoria].push(item);
        });
        this.categoriasDisponibles = ['Todas', ...Object.keys(this.inventarioPorCategoria)];
    }

    seleccionarCategoria(categoria: string) {
        this.categoriaSeleccionada = categoria;
    }

    filtrarCategorias() {
        if (this.categoriaSeleccionada === 'Todas') {
            return Object.entries(this.inventarioPorCategoria);
        }
        return Object.entries(this.inventarioPorCategoria)
            .filter(([key]) => key === this.categoriaSeleccionada);
    }
}
