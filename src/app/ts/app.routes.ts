import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login';
import { HomeComponent } from './Mesero/home.component';
import { AgregarPedidoComponent } from './Mesero/agregar-pedido.component';
import { ConsultarPedidoComponent } from './Mesero/consultar-pedido.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'mesero', component: HomeComponent },
    { path: 'agregar-pedido', component: AgregarPedidoComponent },
    { path: 'consultar-pedido', component: ConsultarPedidoComponent } 

];

export class AppRoutes { }
