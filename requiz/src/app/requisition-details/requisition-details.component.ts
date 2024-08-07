import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RequisicionDetailsService } from '../services/requisition-details.service';
import { CategoriaService } from '../services/categoria-service.service';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-requisition-details',
  templateUrl: './requisition-details.component.html',
  styleUrls: ['./requisition-details.component.css']
})
export class RequisitionDetailsComponent implements OnInit {
  requisicionId: number | null = null;
  productos: { id_producto: number; producto: string; unidad: string; cantidad: number; categorias: string }[] = [];
  dataSource = new MatTableDataSource(this.productos);
  displayedColumns: string[] = ['producto', 'cantidad', 'unidad', 'categorias', 'acciones'];
  errorMessage: string | null = null;
  filterControl = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private requisicionesService: RequisicionDetailsService,
    private categoriaService: CategoriaService,
    public dialog: MatDialog
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
          cantidad: producto.productos.cantidad,
          categorias: producto.productos.categoria_producto
            .map((categoriaProd: any) => categoriaProd.categorias.nombre)
            .join(', ')
        }));
        this.dataSource.data = this.productos;
      } catch (error) {
        this.handleError(error);
      }
    }

    this.filterControl.valueChanges.subscribe(value => this.applyFilter(value || ''));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleError(error: unknown) {
    if (error instanceof Error) {
      this.errorMessage = error.message;
    } else if (typeof error === 'string') {
      this.errorMessage = error;
    } else {
      this.errorMessage = 'Ocurrió un error desconocido';
    }
    console.error(this.errorMessage);
  }

  async editProduct(producto: any) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '400px',
      data: producto
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        try {
          await this.requisicionesService.updateProducto(producto.id_producto, result);
          const updatedCategoria = await this.getCategoriaNombre(result.categoria);
          const index = this.productos.findIndex(p => p.id_producto === producto.id_producto);
          if (index !== -1) {
            this.productos[index] = { ...producto, ...result, categorias: updatedCategoria };
            this.dataSource.data = this.productos;
          }
        } catch (error) {
          this.handleError(error);
        }
      }
    });
  }

  async deleteProduct(id_producto: number) {
    const producto = this.productos.find(p => p.id_producto === id_producto);
    if (!producto) {
      this.handleError('Producto no encontrado');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: producto
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        try {
          await this.requisicionesService.deleteProducto(id_producto);
          this.productos = this.productos.filter(p => p.id_producto !== id_producto);
          this.dataSource.data = this.productos;
        } catch (error) {
          this.handleError(error);
        }
      }
    });
  }

  async getCategoriaNombre(id_categoria: number): Promise<string> {
    try {
      const categorias = await this.categoriaService.getCategorias();
      const categoria = categorias.find(c => c.id_categoria === id_categoria);
      return categoria ? categoria.nombre : 'Desconocida';
    } catch (error) {
      this.handleError(error);
      return 'Desconocida';
    }
  }
}