import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';  // Importa Router, RouterOutlet y RouterModule

@Component({
  selector: 'app-auxiliar-layout',
  templateUrl: './auxiliar-layout.component.html',
  styleUrls: ['./auxiliar-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterModule]  // Agrega RouterModule para habilitar la inyección de Router
})
export class AuxiliarLayoutComponent {
  constructor(private router: Router) {}  // Ahora Router se puede inyectar correctamente

  logout() {
    // Lógica para cerrar sesión
    this.router.navigate(['/login']);
  }
}