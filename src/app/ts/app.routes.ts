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
import { SolicitudAlimentosComponent } from './JefeCocina/solicitud_alimentos.component';
import { InventarioComponent } from './JefeCocina/inventario.component';
import { HomeInventariosComponent } from './Admin/home_inventarios.component';
import { AgregarInventarioComponent } from './Admin/agregar_inventario.component';
import { HomeAuxiliarComponent } from './AuxiliarCompra/home_auxiliar.component';
import { ConsultaSolicitudesComponent } from './AuxiliarCompra/consulta_solicitudes.component';
import { SolicitudCotizacionComponent } from './AuxiliarCompra/solicitud_cotizacion.component';
import { AdminLayoutComponent } from './Admin/admin-layout/admin-layout.component';  // Layout para admin

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Rutas del Administrador: ANIDADAS bajo el layout con sidebar
  {
    path: 'admin',
    component: AdminLayoutComponent,  // Carga el layout (sidebar + header + router-outlet)
    children: [
      { path: 'home_admin', component: HomeAdminComponent },  // Ruta: /admin/home_admin
      { path: 'home_sucursal/:id', component: HomeSucursalComponent },  // Mantiene el parámetro :id
      { path: 'registrar_sucursal', component: RegistrarSucursalComponent },
      { path: 'home_proveedores', component: HomeProveedoresComponent },
      { path: 'registrar_proveedor', component: RegistrarProveedorComponent },
      { path: 'home_listas', component: HomeListasComponent },
      { path: 'crear_lista', component: CrearListasComponent },
      { path: 'home_crear_usuarios', component: HomeCrearUsuariosComponent },
      { path: 'crear_usuario', component: CrearUsuarioComponent },
      { path: 'home_inventarios', component: HomeInventariosComponent },
      { path: 'agregar_inventario', component: AgregarInventarioComponent },
      // Redirect por defecto: al ir a /admin, carga el home_admin
      { path: '', redirectTo: 'home_admin', pathMatch: 'full' }
    ]
  },

  // Mesero (sin cambios)
  { path: 'mesero', component: HomeComponent },
  { path: 'agregar_pedido', component: AgregarPedidoComponent },
  { path: 'consultar_pedido', component: ConsultarPedidoComponent },

  // Jefe de Cocina (sin cambios, corregí el comentario)
  { path: 'home_jefe', component: HomeJefeComponent },
  { path: 'jefe_menu', component: JefeMenuComponent },
  { path: 'agregar_plato', component: AgregarPlatoComponent },
  { path: 'solicitud_alimentos', component: SolicitudAlimentosComponent },
  { path: 'inventario', component: InventarioComponent },

  // Auxiliar de compras (sin cambios)
  { path: 'home_auxiliar', component: HomeAuxiliarComponent },
  { path: 'consulta_solicitudes', component: ConsultaSolicitudesComponent },
  { path: 'solicitud_cotizacion', component: SolicitudCotizacionComponent },

  // Ruta 404 (opcional, pero recomendada)
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export class AppRoutes { }  // Mantengo esto si lo usas en algún lugar, pero no es necesario
