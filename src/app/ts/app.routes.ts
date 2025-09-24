import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login';
import { HomeComponent } from './Mesero/home.component';
import { AgregarPedidoComponent } from './Mesero/agregar-pedido.component';
import { ConsultarPedidoComponent } from './Mesero/consultar-pedido.component';
import { HomeAdminComponent } from './Admin/home_admin.component';      
import { HomeSucursalComponent } from './Admin/home_sucursal.component';  
import { RegistrarSucursalComponent } from './Admin/registrar_sucursal.component';  


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'mesero', component: HomeComponent },
    { path: 'agregar_pedido', component: AgregarPedidoComponent },
    { path: 'consultar_pedido', component: ConsultarPedidoComponent },
    { path: 'home_admin', component: HomeAdminComponent },
    { path: 'home_sucursal', component: HomeSucursalComponent},
    { path: 'registrar_sucursal', component: RegistrarSucursalComponent}

];

export class AppRoutes { }
