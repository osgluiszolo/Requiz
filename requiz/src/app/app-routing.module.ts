import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Ensure RouterModule is imported
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChefsComponent } from './chefs/chefs.component';
import { MateriasComponent } from './materias/materias.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { RequisicionesComponent } from './requisiciones/requisiciones.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'chefs', component: ChefsComponent },
  { path: 'materias', component: MateriasComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'requisiciones', component: RequisicionesComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Ensure RouterModule is correctly used
  exports: [RouterModule] // Ensure RouterModule is exported
})
export class AppRoutingModule { }