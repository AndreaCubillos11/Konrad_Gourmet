import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login';
import { HomeComponent } from './Mesero/home.component';
import { AgregarPedidoComponent } from './Mesero/agregar-pedido.component';
import { ConsultarPedidoComponent } from './Mesero/consultar-pedido.component';
import { HomeAdminComponent } from './Admin/home_admin.component';      
import { HomeSucursalComponent } from './Admin/home_sucursal.component';  
import { RegistrarSucursalComponent } from './Admin/registrar_sucursal.component';  
import { HomeProveedoresComponent } from './Admin/home_proveedores.component';  
import { RegistrarProveedorComponent } from './Admin/registrar_proveedor.component';
import { HomeListasComponent } from './Admin/home_listas.component';
import { CrearListasComponent } from './Admin/crear_listas.component';





export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'mesero', component: HomeComponent },
    { path: 'agregar_pedido', component: AgregarPedidoComponent },
    { path: 'consultar_pedido', component: ConsultarPedidoComponent },
    { path: 'home_admin', component: HomeAdminComponent },
    { path: 'home_sucursal/:id', component: HomeSucursalComponent},
    { path: 'registrar_sucursal', component: RegistrarSucursalComponent},
    { path: 'home_proveedores', component: HomeProveedoresComponent},
    { path: 'home_listas', component: HomeListasComponent},
    { path: 'crear_lista', component: CrearListasComponent}

];

export class AppRoutes { }
