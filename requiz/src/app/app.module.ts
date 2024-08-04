import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

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
import { RequisitionDetailsComponent } from './requisition-details/requisition-details.component';
import { SupabaseService } from './services/supabase.service';
import { ChefService } from './services/chefs.service';
import { RequisicionDetailsService } from './services/requisition-details.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


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
    RequisicionesComponent,
    RequisitionDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    NgxDatatableModule
  ],
  providers: [SupabaseService, ChefService, RequisicionDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }