import { Routes } from '@angular/router';

// Componentes de autenticación/registro (fuera del layout)
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { OlvidarContrasenaComponent } from './olvidar-contrasena/olvidar-contrasena.component';
import { AuthComponent } from './auth/auth.component';

// Layout
import { LayoutComponent } from './layout/layout.component';

// Páginas internas (con layout)
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PerfilPublicoComponent } from './perfil-publico/perfil-publico.component';
import { ProductoCompraComponent } from './producto-compra/producto-compra.component';
import { ProductoSubastaComponent } from './producto-subasta/producto-subasta.component';
import { ProductoVentaComponent } from './producto-venta/producto-venta.component';
import { PublicarProductoComponent } from './publicar-producto/publicar-producto.component';
import { VerEnviosComponent } from './ver-envios/ver-envios.component';
import { RankingVendedoresComponent } from './ranking-vendedores/ranking-vendedores.component';
import { RankingSubastasComponent } from './ranking-subastas/ranking-subastas.component';
import { ProductosCompradosComponent } from './productos-comprados/productos-comprados.component';
import { ProductosVendidosComponent } from './productos-vendidos/productos-vendidos.component';
import { ProductosPublicadosComponent } from './productos-publicados/productos-publicados.component';
import { VerCategoriasComponent } from './ver-categorias/ver-categorias.component';
import { MenuProductosVentaComponent } from './menu-productos-venta/menu-productos-venta.component';
import { MenuProductosSubastaComponent } from './menu-productos-subasta/menu-productos-subasta.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarritoComponent } from './carrito/carrito.component';
import { SubastasActivasComponent } from './subastas-activas/subastas-activas.component';
import { ProductosActivosComponent } from './productos-activos/productos-activos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/crear-cuenta', pathMatch: 'full' },
  { path: 'crear-cuenta', component: CrearCuentaComponent },
  { path: 'olvidar-contrasena', component: OlvidarContrasenaComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: 'menu-principal', component: MenuPrincipalComponent },
      { path: 'perfil-usuario', component: PerfilUsuarioComponent },
      { path: 'perfil-publico/:id', component: PerfilPublicoComponent },
      { path: 'producto-compra', component: ProductoCompraComponent },
      { path: 'producto-subasta', component: ProductoSubastaComponent },
      { path: 'producto-venta', component: ProductoVentaComponent },
      { path: 'publicar-producto', component: PublicarProductoComponent },
      { path: 'ver-envios', component: VerEnviosComponent },
      { path: 'ranking-vendedores', component: RankingVendedoresComponent },
      { path: 'ranking-subastas', component: RankingSubastasComponent },
      { path: 'productos-comprados', component: ProductosCompradosComponent },
      { path: 'productos-vendidos', component: ProductosVendidosComponent },
      { path: 'productos-publicados', component: ProductosPublicadosComponent },
      { path: 'ver-categorias', component: VerCategoriasComponent },
      { path: 'menu-productos-venta', component: MenuProductosVentaComponent },
      { path: 'menu-productos-subasta', component: MenuProductosSubastaComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'carrito', component: CarritoComponent },
      { path: 'subastas-activas', component: SubastasActivasComponent },
      { path: 'productos-activos', component: ProductosActivosComponent },
      { path: '', redirectTo: 'menu-principal', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/crear-cuenta' }
];
