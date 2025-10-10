import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'home-inventarios',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: '../../html/Administrador/home_inventarios.html',
    styleUrls: ['../../css/home_inventarios.css']
})
export class HomeInventariosComponent { }
