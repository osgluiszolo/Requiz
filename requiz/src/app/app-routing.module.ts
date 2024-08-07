// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'chefs', loadChildren: () => import('./chefs/chefs.module').then(m => m.ChefsModule) },
  { path: 'materias', loadChildren: () => import('./materias/materias.module').then(m => m.MateriasModule) },
  { path: 'productos', loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule) },
  { path: 'categorias', loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule) },
  { path: 'requisiciones', loadChildren: () => import('./requisiciones/requisiciones.module').then(m => m.RequisicionesModule) },
  { path: 'requisition/:id', loadChildren: () => import('./requisition-details/requisition-details.module').then(m => m.RequisitionDetailsModule) },
  { path: 'condensado-productos', loadChildren: () => import('./condensado-productos/condensado-productos.module').then(m => m.CondensadoProductosModule) },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }