import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../services/categoria-service.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {
  editProductForm: FormGroup;
  categorias: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) {
    this.editProductForm = this.fb.group({
      producto: [data.producto, Validators.required],
      unidad: [data.unidad, Validators.required],
      cantidad: [data.cantidad, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required] // Usar 'categoria' en singular para el select
    });
  }

  async ngOnInit() {
    try {
      this.categorias = await this.categoriaService.getCategorias();
    } catch (error) {
      console.error('Error fetching categories:', error);
    }

    // Establecer la categoría actual
    if (this.data.categorias && this.data.categorias.length > 0) {
      this.editProductForm.patchValue({ categoria: this.data.categorias[0].id_categoria });
    }
  }

  onSave(): void {
    if (this.editProductForm.valid) {
      this.dialogRef.close(this.editProductForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}