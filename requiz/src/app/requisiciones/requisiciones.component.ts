import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RequisicionesService } from '../services/requisiciones-service.service';
import { CategoriaService } from '../services/categoria-service.service';
import { ChangeDetectorRef } from '@angular/core';

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
  productosData: any[][] = [];
  editing: boolean[][] = [];

  displayedColumns: string[] = ['index', 'nombre', 'cantidad', 'unidad', 'acciones'];

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private requisicionesService: RequisicionesService,
    private categoriaService: CategoriaService,
    private cd: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    this.requisicionForm = this.fb.group({
      materia: ['', Validators.required],
      chef: ['', Validators.required],
      fecha: ['', Validators.required],
      semana: ['', Validators.required],
      sections: this.fb.array([]) // FormArray for sections
    });
  }

  ngOnInit() {
    this.loadData();
    this.addSection(); // Initialize with one section
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

  get sections(): FormArray {
    return this.requisicionForm.get('sections') as FormArray;
  }

  productos(sectionIndex: number): FormArray {
    return this.sections.at(sectionIndex).get('productos') as FormArray;
  }

  addSection() {
    const sectionGroup = this.fb.group({
      categoria: ['', Validators.required],
      productos: this.fb.array([this.createProductoGroup()]) // Initialize with one product group
    });
    this.sections.push(sectionGroup);
    this.productosData.push([]); // Initialize an empty array for the new section
    this.editing.push([]); // Initialize an empty array for the editing state
  }

  createProductoGroup(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      unidad: ['', Validators.required]
    });
  }

  addProducto(sectionIndex: number) {
    this.productos(sectionIndex).push(this.createProductoGroup());
  }

  onAddProducto(sectionIndex: number) {
    const productoArray = this.productos(sectionIndex);
    const productoGroup = productoArray.at(productoArray.length - 1); // Get the last product group in the form array

    const categoriaControl = this.sections.at(sectionIndex)?.get('categoria');
    if (productoGroup.invalid || !categoriaControl || categoriaControl.value == null) {
      this.errorMessage = 'Por favor complete todos los campos del producto y seleccione una categoría.';
      return;
    }

    const producto = productoGroup.value;
    console.log('Producto agregado:', producto); // Debugging log
    this.productosData[sectionIndex].push(producto);
    this.editing[sectionIndex].push(false); // Initialize the editing state to false
    console.log('Productos data actualizada:', this.productosData[sectionIndex]); // Debugging log

    // Clear and reinitialize the form fields
    productoArray.clear();
    this.addProducto(sectionIndex);
    this.cd.detectChanges(); // Manually trigger change detection
  }

  onRemoveProducto(sectionIndex: number, productoIndex: number) {
    this.productosData[sectionIndex].splice(productoIndex, 1); // Remove product from data array
    this.editing[sectionIndex].splice(productoIndex, 1); // Remove editing state for the removed product
    this.cd.detectChanges(); // Manually trigger change detection
  }

  onEditProducto(sectionIndex: number, productoIndex: number) {
    if (this.editing[sectionIndex][productoIndex]) {
      // Save changes
      const productoForm = this.productos(sectionIndex).at(productoIndex);
      if (productoForm.invalid) {
        this.errorMessage = 'Por favor complete todos los campos del producto.';
        return;
      }
      this.productosData[sectionIndex][productoIndex] = productoForm.value;
      this.editing[sectionIndex][productoIndex] = false;
    } else {
      // Enable editing
      this.editing[sectionIndex][productoIndex] = true;
    }
    this.cd.detectChanges(); // Manually trigger change detection
  }

  isEditing(sectionIndex: number, productoIndex: number): boolean {
    return this.editing[sectionIndex][productoIndex] ?? false;
  }

  getProductosDataSource(sectionIndex: number) {
    return [...this.productosData[sectionIndex]]; // Return a copy of the array to trigger change detection
  }

  async submit() {
    const formValue = this.requisicionForm.value;

    // Validación de campos principales del formulario
    if (!this.requisicionForm.controls['materia'].valid ||
        !this.requisicionForm.controls['chef'].valid ||
        !this.requisicionForm.controls['fecha'].valid ||
        !this.requisicionForm.controls['semana'].valid) {
      this.errorMessage = 'Por favor complete todos los campos de la requisición.';
      return;
    }

    try {
      // Datos de la requisición sin los productos
      const requisicionData = {
        id_chef: formValue['chef'],
        id_materia: formValue['materia'],
        fecha: formValue['fecha'],
        semana: formValue['semana']
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

      // Insertar los productos y las relaciones correspondientes por sección
      for (const sectionIndex of Object.keys(formValue['sections'])) {
        const categoriaId = formValue['sections'][parseInt(sectionIndex, 10)]['categoria'];
        const productos = this.productosData[parseInt(sectionIndex, 10)];

        for (const producto of productos) {
          const productData = {
            producto: producto['nombre'],
            cantidad: producto['cantidad'],
            unidad: producto['unidad']
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
          const categoriaProductoData = {
            id_producto: productId,
            id_categoria: categoriaId
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
      this.errorMessage = error
    } else if (typeof error === 'string') {
      this.errorMessage = error;
    } else {
      this.errorMessage = 'Ocurrió un error desconocido';
    }
  }

  getCategoriaNombre(sectionIndex: number): string {
    const categoriaId = this.sections.at(sectionIndex)?.get('categoria')?.value;
    if (categoriaId) {
      const categoria = this.categorias.find(cat => cat.id_categoria === categoriaId);
      return categoria ? categoria.nombre : 'Ninguna';
    }
    return 'Ninguna';
  }
}