import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/categoria-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  requisiciones: any[] = [];
  filteredRequisiciones = new MatTableDataSource<any>();
  errorMessage: string | null = null;
  displayedColumns: string[] = ['id_requisicion', 'nombre_chef', 'modulo', 'fecha', 'semana', 'acciones'];

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.requisiciones = await this.categoriaService.getRequisiciones();
      this.filteredRequisiciones.data = this.requisiciones;
    } catch (error) {
      this.handleError(error);
    }
  }

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredRequisiciones.filterPredicate = (data, filter) => {
      return data.id_requisicion.toString().includes(filter) ||
             data.nombre_chef.toLowerCase().includes(filter) ||
             data.modulo.toLowerCase().includes(filter) ||
             data.fecha.includes(filter) ||
             data.semana.toString().includes(filter);
    };
    this.filteredRequisiciones.filter = filterValue;
  }

  applyDateFilter(event: any) {
    const filterValueStr = event.value ? event.value.toISOString().split('T')[0] : '';
    this.filteredRequisiciones.filterPredicate = (data, filter) => {
      return data.fecha.includes(filter);
    };
    this.filteredRequisiciones.filter = filterValueStr;
  }

  viewRequisition(id: number) {
    this.router.navigate(['/requisition', id]);
  }

  handleError(error: unknown) {
    if (error instanceof Error) {
      this.errorMessage = error.message;
    } else if (typeof error === 'string') {
      this.errorMessage = error;
    } else {
      this.errorMessage = 'Ocurrió un error desconocido';
    }
  }
}