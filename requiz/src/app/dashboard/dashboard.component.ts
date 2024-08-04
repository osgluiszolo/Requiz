import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/categoria-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  requisiciones: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.requisiciones = await this.categoriaService.getRequisiciones();
      console.log(this.requisiciones);  // Asegúrate de que los datos están correctamente formateados
    } catch (error) {
      this.handleError(error);
    }
  }

  viewRequisition(id: number) {
    console.log('Navigating to requisition with ID:', id);  // Agrega un log para verificar el ID
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