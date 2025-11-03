import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Inventario } from '../../services/JefeCocina/inventario';
import { CommonModule } from '@angular/common';
import { io, Socket } from 'socket.io-client'; // 👈 Importar Socket.io
import { Alertas } from '../../alertas';

@Component({
    selector: 'app-inventario',
    imports: [CommonModule],
    templateUrl: '../../html/JefeCocina/inventario.html',
    styleUrls: ['../../css/inventario.css']
})
export class InventarioComponent implements OnInit {

    inventario: any[] = [];
    inventarioPorCategoria: { [key: string]: any[] } = {};
    categoriasDisponibles: string[] = [];
    categoriaSeleccionada: string = 'Todas';
    sucursalId:any;

    constructor(
        private router: Router,
        private cookieService: CookieService,
        private inventarioService: Inventario,
        private alertasService: Alertas // 👈 Servicio de alertas inyectado
    ) { }

    ngOnInit(): void {
        console.log('🟡 Iniciando componente de inventario...');
        this.sucursalId = localStorage.getItem('id_sucursal');
        if (!this.sucursalId) {
            console.warn('⚠️ No se encontró ID de sucursal en el localStorage.');
        } else {
            console.log('🏪 ID de sucursal cargado:', this.sucursalId);
        }
        this.escucharAlertas();
    }


    // ✅ Escucha en tiempo real las alertas desde el backend
    escucharAlertas(): void {
        console.log('📡 Configurando escucha de alertas...');
        this.alertasService.onAlertaNueva().subscribe(alerta => {
            console.log('🚨 Alerta recibida en el componente:', alerta);
            alert(`⚠️ ${alerta.mensaje}`); // Puedes personalizar el mensaje mostrado al usuario
            this.consultarInventarioPorSucursal(); // Refresca el inventario al recibir alerta
        });
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
