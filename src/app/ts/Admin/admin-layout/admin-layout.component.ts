import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';  // Importa RouterModule y Router
import { CommonModule } from '@angular/common';  // Para directivas básicas como @for, si las usas

@Component({
  selector: 'app-admin-layout',
  standalone: true,  // <-- Hazlo standalone
  imports: [RouterModule, CommonModule],  // <-- IMPORTA RouterModule AQUÍ: resuelve router-outlet y routerLinkActive
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})

export class AdminLayoutComponent {
  constructor(private router: Router) { 
    console.log('AdminLayoutComponent cargado');
  }

  logout() {
    console.log('Ejecutando logout');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
