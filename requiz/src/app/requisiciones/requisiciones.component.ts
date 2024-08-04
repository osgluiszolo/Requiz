import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RequisicionesService } from '../services/requisiciones-service.service';
import { CategoriaService } from '../services/categoria-service.service';

@Component({
  selector: 'app-requisiciones',
  templateUrl: './requisiciones.component.html',
  styleUrls: ['./requisiciones.component.css']
})
export class RequisicionesComponent implements OnInit {
  requisicionForm: FormGroup;
  materias: any[] = [];
  chefs: any[] = [];
  categorias: any[] = [];
  currentCategoriaId: number | null = null;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private requisicionesService: RequisicionesService,
    private categoriaService: CategoriaService
  ) {
    this.requisicionForm = this.fb.group({
      materia: ['', Validators.required],
      chef: ['', Validators.required],
      fecha: ['', Validators.required],
      semana: ['', Validators.required],
      categoria: ['', Validators.required],
      productos: this.fb.array([]) // Inicializa el FormArray para productos
    });
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      this.materias = await this.requisicionesService.getMaterias();
      this.chefs = await this.requisicionesService.getChefs();
      this.categorias = await this.categoriaService.getCategorias();
    } catch (error) {
      this.handleError(error);
    }
  }

  get productos(): FormArray {
    return this.requisicionForm.get('productos') as FormArray;
  }

  addProducto() {
    const productoGroup = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      unidad: ['', Validators.required]
    });
    this.productos.push(productoGroup);
  }

  onCategoriaChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.currentCategoriaId = target.value ? parseInt(target.value, 10) : null;
  }

  async submit() {
    if (this.requisicionForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos de la requisición.';
      return;
    }

    try {
      const formValue = this.requisicionForm.value;
      const requisicionData = {
        id_chef: formValue.chef,
        id_materia: formValue.materia,
        fecha: formValue.fecha,
        semana: formValue.semana
      };

      // Insertar la requisición y obtener el ID generado
      const response = await this.requisicionesService.addRequisicion(requisicionData);
      const requisicion = response[0];
      const requisicionError = response.error;

      if (requisicionError) {
        console.error('Error al insertar la requisición:', requisicionError);
        throw requisicionError;
      }
      if (!requisicion) {
        console.error('Error al obtener la nueva requisición.');
        throw new Error('Error al obtener la nueva requisición.');
      }

      const requisicionId = requisicion.id_requisicion;
      console.log('Requisición insertada con ID:', requisicionId);

      // Insertar los productos y las relaciones correspondientes
      for (const producto of formValue.productos) {
        const productData = {
          producto: producto.nombre,
          cantidad: producto.cantidad,
          unidad: producto.unidad
        };

        const productResponse = await this.requisicionesService.addProducto(productData);
        const product = productResponse[0];
        const productError = productResponse.error;

        if (productError) {
          console.error('Error al insertar el producto:', productError);
          throw productError;
        }
        if (!product) {
          console.error('Error al obtener el nuevo producto.');
          throw new Error('Error al obtener el nuevo producto.');
        }

        const productId = product.id_producto;
        console.log('Producto insertado con ID:', productId);

        // Insertar relación en requisicion_producto
        const requisicionProductoData = {
          id_requisicion: requisicionId,
          id_producto: productId
        };
        const requisicionProductoResponse = await this.requisicionesService.addRequisicionProducto(requisicionProductoData);
        const requisicionProducto = requisicionProductoResponse[0];
        const requisicionProductoError = requisicionProductoResponse.error;

        if (requisicionProductoError) {
          console.error('Error al insertar la relación requisición-producto:', requisicionProductoError);
          throw requisicionProductoError;
        }
        if (!requisicionProducto) {
          console.error('Error al obtener la nueva relación requisicion-producto.');
          throw new Error('Error al obtener la nueva relación requisicion-producto.');
        }

        console.log('Relación requisición-producto insertada:', requisicionProducto);

        // Insertar relación en categoria_producto
        if (this.currentCategoriaId !== null) {
          const categoriaProductoData = {
            id_producto: productId,
            id_categoria: this.currentCategoriaId
          };
          const categoriaProductoResponse = await this.requisicionesService.addCategoriaProducto(categoriaProductoData);
          const categoriaProducto = categoriaProductoResponse[0];
          const categoriaProductoError = categoriaProductoResponse.error;

          if (categoriaProductoError) {
            console.error('Error al insertar la relación categoria-producto:', categoriaProductoError);
            throw categoriaProductoError;
          }
          if (!categoriaProducto) {
            console.error('Error al obtener la nueva relación categoria-producto.');
            throw new Error('Error al obtener la nueva relación categoria-producto.');
          }

          console.log('Relación categoria-producto insertada:', categoriaProducto);
        } else {
          console.error('No se seleccionó ninguna categoría');
          throw new Error('No se seleccionó ninguna categoría');
        }
      }

      this.successMessage = 'Requisición enviada exitosamente.';
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error);
      this.errorMessage = error.message;
    } else if (typeof error === 'string') {
      this.errorMessage = error;
    } else {
      this.errorMessage = 'Ocurrió un error desconocido';
    }
  }

  getCategoriaNombre(): string {
    if (this.currentCategoriaId !== null) {
      const categoria = this.categorias.find(cat => cat.id_categoria === this.currentCategoriaId);
      return categoria ? categoria.nombre : 'Ninguna';
    }
    return 'Ninguna';
  }
}