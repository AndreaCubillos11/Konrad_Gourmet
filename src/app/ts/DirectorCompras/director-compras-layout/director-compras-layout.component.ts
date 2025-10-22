import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-director-layout',
  templateUrl: './director-compras-layout.component.html',
  styleUrls: ['./director-compras-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterModule]
})
export class DirectorComprasLayoutComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Limpia datos de sesión
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    // Redirige al login
    this.router.navigate(['/login']);
  }
}