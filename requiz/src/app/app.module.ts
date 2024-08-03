import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ChefsComponent } from './chefs/chefs.component';
import { MateriasComponent } from './materias/materias.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { RequisicionesComponent } from './requisiciones/requisiciones.component';
import { SupabaseService } from './supabase.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    HeaderComponent,
    ChefsComponent,
    MateriasComponent,
    ProductosComponent,
    CategoriasComponent,
    RequisicionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Ensure AppRoutingModule is imported
    FormsModule
  ],
  providers: [SupabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }