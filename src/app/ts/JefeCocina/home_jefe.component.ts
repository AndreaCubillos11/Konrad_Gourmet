import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Inventario } from '../../services/JefeCocina/inventario';

@Component({
    selector: 'app-home-jefe',
    standalone: true,
    imports: [CommonModule],
    templateUrl: '../../html/JefeCocina/home_jefe.html',
    styleUrls: ['../../css/home_jefe.css']
})
export class HomeJefeComponent implements OnInit {

    constructor(
        private router: Router,
        private inventarioService: Inventario,
        private cookieService: CookieService
    ) { }

    // Valores dinámicos
    inventario = 0;
    menu = 45;
    pedidos = 32;

    disponibilidadInventario: number = 0;

    ngOnInit() {
        this.calcularDisponibilidadInventario();
    }

    irAgregarPlato() {
        this.router.navigate(['jefe/agregar_plato']);
    }

    consultarInventario() {
        alert('Consultando inventario...');
        this.router.navigate(['jefe/inventario']);
    }

    nuevoPedido() {
        alert('Creando un nuevo pedido...');
        this.router.navigate(['jefe/solicitud_alimentos']);
       
    }

    // 🔹 Calcula la disponibilidad de inventario desde la API
    calcularDisponibilidadInventario() {
        const token = this.cookieService.get('token');
        const idUsuario = localStorage.getItem('id_usuario');
        const idSucursal = localStorage.getItem('id_sucursal');

        this.inventarioService.getInventarioPorSucursal(token, idUsuario, idSucursal).subscribe({
            next: (data) => {
                if (data.length > 0) {
                    const totalMaximo = data.reduce(
                        (acc: number, item: any) => acc + parseFloat(item.stock_maximo || 0),
                        0
                    );
                    const totalActual = data.reduce(
                        (acc: number, item: any) => acc + parseFloat(item.cantidad_producto || 0),
                        0
                    );
                    this.disponibilidadInventario = (totalActual / totalMaximo) * 100;
                } else {
                    this.disponibilidadInventario = 0;
                }
            },
            error: (err) => {
                console.error('Error al consultar inventario:', err);
                this.disponibilidadInventario = 0;
            }
        });
    }
}
