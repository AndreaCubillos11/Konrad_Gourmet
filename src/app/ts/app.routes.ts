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
import { HomeCrearUsuariosComponent } from './Admin/home_crearUsuarios.component';
import { HomeJefeComponent } from './JefeCocina/home_jefe.component';
import { JefeMenuComponent } from './JefeCocina/jefe_menu.component';
import { AgregarPlatoComponent } from './JefeCocina/agregar_plato.component';
import { CrearUsuarioComponent } from './Admin/crear_usuario.component';
import { SolicitudAlimentosComponent } from './JefeCocina/solicitud_alimentos.component'
import { InventarioComponent } from './JefeCocina/inventario.component'
import { HomeInventariosComponent } from './Admin/home_inventarios.component'
import { AgregarInventarioComponent } from './Admin/agregar_inventario.component'
import { HomeAuxiliarComponent } from './AuxiliarCompra/home_auxiliar.component'
import { ConsultaSolicitudesComponent } from './AuxiliarCompra/consulta_solicitudes.component'
import { SolicitudCotizacionComponent } from './AuxiliarCompra/solicitud_cotizacion.component'


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    //Mesero
    { path: 'mesero', component: HomeComponent },
    { path: 'agregar_pedido', component: AgregarPedidoComponent },
    { path: 'consultar_pedido', component: ConsultarPedidoComponent },
    //Administrador
    { path: 'home_admin', component: HomeAdminComponent },
    { path: 'home_sucursal/:id', component: HomeSucursalComponent },
    { path: 'registrar_sucursal', component: RegistrarSucursalComponent },
    { path: 'home_proveedores', component: HomeProveedoresComponent },
    { path: 'registrar_proveedor', component: RegistrarProveedorComponent },
    { path: 'home_listas', component: HomeListasComponent },
    { path: 'crear_lista', component: CrearListasComponent },
    { path: 'home_crear_usuarios', component: HomeCrearUsuariosComponent },
    { path: 'crear_usuario', component: CrearUsuarioComponent },
    { path: 'home_inventarios', component: HomeInventariosComponent },
    { path: 'agregar_inventario', component: AgregarInventarioComponent },
    //Jefe de Cocina
    { path: 'home_jefe', component: HomeJefeComponent },
    { path: 'jefe_menu', component: JefeMenuComponent },
    { path: 'agregar_plato', component: AgregarPlatoComponent },
    { path: 'solicitud_alimentos', component: SolicitudAlimentosComponent },
    { path: 'inventario', component: InventarioComponent },
    //Auxiliar de compras
    { path: 'home_auxiliar', component: HomeAuxiliarComponent },
    { path: 'consulta_solicitudes', component: ConsultaSolicitudesComponent },
    { path: 'solicitud_cotizacion', component: SolicitudCotizacionComponent }

];

export class AppRoutes { }
