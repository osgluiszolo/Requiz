import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequisicionDetailsService } from '../services/requisition-details.service';

@Component({
  selector: 'app-requisition-details',
  templateUrl: './requisition-details.component.html',
  styleUrls: ['./requisition-details.component.css']
})
export class RequisitionDetailsComponent implements OnInit {
  requisicionId: number | null = null;
  productos: { id_producto: number; producto: string; unidad: string; cantidad: number; categorias: string }[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private requisicionesService: RequisicionDetailsService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.requisicionId = parseInt(id, 10);
      try {
        const productosResponse = await this.requisicionesService.getProductosByRequisicionId(this.requisicionId);
        this.productos = productosResponse.map((producto: any) => ({
          id_producto: producto.id_producto,
          producto: producto.productos.producto,
          unidad: producto.productos.unidad,
          cantidad: producto.productos.cantidad, // Asegúrate de que 'cantidad' está incluido en la respuesta
          categorias: producto.productos.categoria_producto
            .map((categoriaProd: any) => categoriaProd.categorias.nombre)
            .join(', ') // Convierte la lista de categorías en una cadena separada por comas
        }));
      } catch (error) {
        this.handleError(error);
      }
    }
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