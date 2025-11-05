import { Component } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
    selector: 'app-tendencias',
    standalone: true,
    imports: [CommonModule, DecimalPipe, RouterModule],
    templateUrl: '../../html/DirectorComercial/tendencias.html',
    styleUrls: ['../../css/tendencias.css']
})
export class TendenciasComponent {

    constructor(private router: Router) { }

    tendenciasVirales = [
        {
            nombre: "Pasta de Trufa Negra",
            motivo: "Auge en recetas gourmet TikTok",
            descuento: "25%",
            precioOriginal: 120000,
            precioFinal: 90000
        },
        {
            nombre: "Harina de Castaña",
            motivo: "Alta demanda en recetas sin gluten",
            descuento: "30%",
            precioOriginal: 35000,
            precioFinal: 24500
        },
        {
            nombre: "Salsa Gochujang",
            motivo: "Tendencia coreana en platos caseros",
            descuento: "18%",
            precioOriginal: 45000,
            precioFinal: 36900
        },
        {
            nombre: "Aceite de Aguacate",
            motivo: "Popular por recetas saludables",
            descuento: "20%",
            precioOriginal: 65000,
            precioFinal: 52000
        },
        {
            nombre: "Pasta de Garbanzos",
            motivo: "Alta en proteína y sin gluten, viral en recetas fitness",
            descuento: "15%",
            precioOriginal: 18000,
            precioFinal: 15300
        },
        {
            nombre: "Miel Orgánica de Lavanda",
            motivo: "Recetas naturales y bebidas relajantes en TikTok",
            descuento: "12%",
            precioOriginal: 32000,
            precioFinal: 28160
        }
    ];


    // 📦 50 productos comestibles tendencia y descuento
    productos = Array.from({ length: 50 }, (_, i) => {
        const nombres = [
            "Quinoa orgánica", "Avena integral", "Miel de romero", "Salsa teriyaki",
            "Cúrcuma molida", "Harina de almendra", "Tofu firme", "Leche de coco",
            "Pasta artesanal", "Chocolate 70% cacao", "Yogurt griego", "Lentejas rojas",
            "Arroz jazmín", "Té matcha", "Vinagre balsámico", "Mantequilla de maní natural",
            "Semillas de chía", "Frijol negro", "Aceite de oliva extra virgen",
            "Sriracha", "Soya texturizada", "Garbanzo", "Aguacates Hass", "Polvo de cacao",
            "Fideos de arroz", "Miso paste", "Pimienta rosada", "Cúrcuma fresca", "Jengibre fresco",
            "Papas nativas", "Tomates cherry", "Queso parmesano", "Pesto verde", "Harina de avena",
            "Azúcar mascabado", "Salmón en lata", "Atún premium", "Arándanos secos",
            "Tortillas de maíz", "Cilantro fresco", "Queso mozzarella", "Manzanas Fuji",
            "Pimentón dulce", "Curry amarillo", "Mix frutos secos", "Ajo negro",
            "Mantequilla clarificada (Ghee)", "Champiñones portobello", "Pechuga de pollo orgánica", "Pan masa madre artesanal"
        ];
        const precios = [10000, 15000, 20000, 25000, 30000, 35000, 40000];
        const descuentos = [5, 10, 12, 15, 18, 20, 25];

        const nombre = nombres[i];
        const precioOriginal = precios[Math.floor(Math.random() * precios.length)];
        const descuento = descuentos[Math.floor(Math.random() * descuentos.length)];
        const precioFinal = precioOriginal - (precioOriginal * descuento / 100);

        return {
            nombre,
            precioOriginal,
            descuento: `${descuento}%`,
            precioFinal
        };
    });

    irAPromociones() {
        this.router.navigate(['directorCompras/promociones']);
    }

}
