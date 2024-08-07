import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';

// Custom Components
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
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { CondensadoProductosComponent } from './condensado-productos/condensado-productos.component';

// Services
import { SupabaseService } from './services/supabase.service';
import { ChefService } from './services/chefs.service';
import { RequisicionDetailsService } from './services/requisition-details.service';
import { CondensadoProductosService } from './condensado-productos.service';

// Third-Party Modules
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
    RequisitionDetailsComponent,
    EditProductDialogComponent,
    ConfirmDeleteDialogComponent,
    CondensadoProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    MatExpansionModule,
    MatDialogModule,
    NgxDatatableModule,
    HttpClientModule  // Asegúrate de que HttpClientModule esté importado aquí
  ],
  providers: [SupabaseService, ChefService, RequisicionDetailsService, CondensadoProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }