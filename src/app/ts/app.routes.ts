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
import { HomeDirecComprasComponent } from './DirectorCompras/home_direc_compras.component';
import { PromocionesComponent } from './DirectorCompras/promociones.component';
import { TendenciasComponent } from './DirectorCompras/tendencias.component';


//layouts
import { AdminLayoutComponent } from './Admin/admin-layout/admin-layout.component';  // Layout para admin
import { AuxiliarLayoutComponent } from './AuxiliarCompra/auxiliar-layout/auxiliar-layout.component';  // NUEVO: Layout para auxiliar
import { MeseroLayoutComponent } from './Mesero/mesero-layout/mesero-layout.component';  // NUEVO
import { JefeLayoutComponent } from './JefeCocina/jefe-layout/jefe-layout.component';  // NUEVO
import { DirectorComprasLayoutComponent } from './DirectorCompras/director-compras-layout/director-compras-layout.component';


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

  // Rutas del Auxiliar de Compras: ANIDADAS bajo el layout con sidebar
  {
    path: 'auxiliar',
    component: AuxiliarLayoutComponent,
    children: [
      { path: 'home_auxiliar', component: HomeAuxiliarComponent },  // Ruta: /auxiliar/home_auxiliar
      { path: 'consulta_solicitudes', component: ConsultaSolicitudesComponent },  // Ruta: /auxiliar/consulta_solicitudes
      { path: 'solicitud_cotizacion', component: SolicitudCotizacionComponent },  // Ruta: /auxiliar/solicitud_cotizacion
      // Redirect por defecto: al ir a /auxiliar, carga el home_auxiliar
      { path: '', redirectTo: 'home_auxiliar', pathMatch: 'full' }
    ]
  },

  // Mesero (sin cambios)
  {
    path: 'mesero',
    component: MeseroLayoutComponent,  // Carga el layout
    children: [
      { path: 'home', component: HomeComponent },  // Ruta: /mesero/home
      { path: 'agregar_pedido', component: AgregarPedidoComponent },  // Ruta: /mesero/agregar_pedido
      { path: 'consultar_pedido', component: ConsultarPedidoComponent },  // Ruta: /mesero/consultar_pedido
      { path: '', redirectTo: 'home', pathMatch: 'full' }  // Redirect por defecto
    ]
  },


  // Jefe de Cocina 
  {
    path: 'jefe',
    component: JefeLayoutComponent,  // Carga el layout
    children: [
      { path: 'home_jefe', component: HomeJefeComponent },  // Ruta: /jefe/home_jefe
      { path: 'jefe_menu', component: JefeMenuComponent },  // Ruta: /jefe/jefe_menu
      { path: 'agregar_plato', component: AgregarPlatoComponent },  // Ruta: /jefe/agregar_plato
      { path: 'inventario', component: InventarioComponent },  // Ruta: /jefe/inventario
      { path: 'solicitud_alimentos', component: SolicitudAlimentosComponent },  // Ruta: /jefe/solicitud_alimentos
      { path: '', redirectTo: 'home_jefe', pathMatch: 'full' }  // Redirect por defecto
    ]
  },

  {
    path: "directorCompras",
    component: DirectorComprasLayoutComponent,
    children: [
      { path: "home_director_compras", component: HomeDirecComprasComponent },
      { path: "promociones", component: PromocionesComponent },
      { path: "tendencias", component: TendenciasComponent },
      { path: '', redirectTo: 'home_director_compras', pathMatch: 'full' }  // Redirect por defecto
    ]
  }



  // Ruta 404 (opcional, pero recomendada)
  //{ path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export class AppRoutes { }  // Mantengo esto si lo usas en algún lugar, pero no es necesario
