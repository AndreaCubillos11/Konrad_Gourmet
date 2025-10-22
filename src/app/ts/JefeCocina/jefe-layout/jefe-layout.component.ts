import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-jefe-layout',
  templateUrl: './jefe-layout.component.html',
  styleUrls: ['./jefe-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterModule]
})
export class JefeLayoutComponent {
  constructor(private router: Router) { }

  logout(): void {
    // Limpia datos de sesión
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    // Redirige al login
    this.router.navigate(['/login']);
  }

  consultarInventario() {
    alert('Consultando inventario...');
  }

}