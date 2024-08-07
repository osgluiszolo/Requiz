import { Component, OnInit } from '@angular/core';
import { CondensadoProductosService } from '../condensado-productos.service';
import { CategoriaService } from '../services/categoria-service.service';
import { ExcelService } from '../services/excel.service';
import { MatTableDataSource } from '@angular/material/table';

interface ProductoCondensado {
  categoria: string;
  producto: string;
  unidad: string;
  cantidad_total: number;
}

@Component({
  selector: 'app-condensado-productos',
  templateUrl: './condensado-productos.component.html',
  styleUrls: ['./condensado-productos.component.css']
})
export class CondensadoProductosComponent implements OnInit {
  selectedDate: Date | null = null;
  selectedCategory: string | null = null;
  displayedColumns: string[] = ['categoria', 'producto', 'unidad', 'cantidad_total'];
  dataSource = new MatTableDataSource<ProductoCondensado>([]);

  categories: any[] = []; // Lista de categorías

  constructor(
    private condensadoProductosService: CondensadoProductosService,
    private categoriaService: CategoriaService,
    private excelService: ExcelService  // Inyectar el servicio de Excel
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.categories = await this.categoriaService.getCategorias();
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  }

  onDateChange(event: any): void {
    this.selectedDate = event;
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.value;
  }

  buscarProductos(): void {
    if (this.selectedDate) {
      const formattedDate = this.selectedDate.toISOString().split('T')[0];
      this.condensadoProductosService.getCondensadoProductos(formattedDate, this.selectedCategory).subscribe(data => {
        this.dataSource.data = data as ProductoCondensado[];
      });
    }
  }

  exportAsExcel(): void {
    const dataToExport = this.dataSource.data.map(item => {
      return {
        Categoria: item.categoria,
        Producto: item.producto,
        Unidad: item.unidad,
        CantidadTotal: item.cantidad_total
      };
    });
    this.excelService.exportAsExcelFile(dataToExport, 'CondensadoProductos');
  }
}