import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mesero-layout',
  templateUrl: './mesero-layout.component.html',
  styleUrls: ['./mesero-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterModule]
})
export class MeseroLayoutComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Limpia datos de sesión (ej. token de autenticación)
    localStorage.removeItem('token');  // O sessionStorage si usas eso
    localStorage.removeItem('userRole');  // Si guardas el rol del usuario

    // Redirige al login
    this.router.navigate(['/login']);
  }
}