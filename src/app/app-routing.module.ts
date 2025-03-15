import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { OlvidarContrasenaComponent } from './olvidar-contrasena/olvidar-contrasena.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component'; // Importa el componente de login
import { ProductoCompraComponent } from './producto-compra/producto-compra.component';
import { ProductoSubastaComponent } from './producto-subasta/producto-subasta.component';



export const routes: Routes = [
  { path: 'auth', component: AuthComponent }, // Ruta para la pantalla de login
  { path: 'crear-cuenta', component: CrearCuentaComponent },
  { path: '', component: AppComponent }, // Asegúrate de que el login está como ruta principal
  { path: 'olvidar-contrasena', component: OlvidarContrasenaComponent },
  { path: 'producto-compra', component: ProductoCompraComponent},
  { path: 'producto-subasta', component: ProductoSubastaComponent}// Redirige a la página principal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
