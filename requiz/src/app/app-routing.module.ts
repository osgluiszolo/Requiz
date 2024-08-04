import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChefsComponent } from './chefs/chefs.component';
import { MateriasComponent } from './materias/materias.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { RequisicionesComponent } from './requisiciones/requisiciones.component';
import { RequisitionDetailsComponent } from './requisition-details/requisition-details.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'chefs', component: ChefsComponent },
  { path: 'materias', component: MateriasComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'requisiciones', component: RequisicionesComponent },
  { path: 'requisition/:id', component: RequisitionDetailsComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Redirect to auth on initial load
  { path: '**', redirectTo: '/auth' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }