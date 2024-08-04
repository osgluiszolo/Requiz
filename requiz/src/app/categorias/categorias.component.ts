import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaService } from '../services/categoria-service.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categoriaForm: FormGroup;
  categorias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategorias();
  }

  async loadCategorias() {
    this.categorias = await this.categoriaService.getCategorias();
  }

  async submit() {
    const { nombre } = this.categoriaForm.value;
    if (nombre) {
      await this.categoriaService.addCategoria(nombre);
      this.categoriaForm.reset();
      this.loadCategorias(); // Reload categories to include the new one
    }
  }
}