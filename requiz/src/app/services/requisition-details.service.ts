import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class RequisicionDetailsService {
  constructor(private supabaseService: SupabaseService) {}

  async getProductosByRequisicionId(requisicionId: number): Promise<any[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('requisicion_producto')
      .select(`
        id_producto,
        productos!fk_producto (
          producto,
          unidad,
          cantidad,
          categoria_producto!fk_producto (
            categorias!fk_categoria (nombre)
          )
        )
      `)
      .eq('id_requisicion', requisicionId);

    if (error) throw error;
    return data || [];
  }

  async updateProducto(id_producto: number, updatedData: any): Promise<void> {
    const { categoria, ...productoData } = updatedData;

    const { error: productError } = await this.supabaseService.supabase
      .from('productos')
      .update(productoData)
      .eq('id_producto', id_producto);

    if (productError) throw productError;

    if (categoria) {
      const { error: deleteError } = await this.supabaseService.supabase
        .from('categoria_producto')
        .delete()
        .eq('id_producto', id_producto);

      if (deleteError) throw deleteError;

      const { data: categoriaData, error: insertError } = await this.supabaseService.supabase
        .from('categoria_producto')
        .insert([{ id_producto, id_categoria: categoria }]);

      if (insertError) throw insertError;
    }
  }

  async deleteProducto(id_producto: number): Promise<void> {
    const { error: deleteCategoriaError } = await this.supabaseService.supabase
      .from('categoria_producto')
      .delete()
      .eq('id_producto', id_producto);

    if (deleteCategoriaError) throw deleteCategoriaError;

    const { error: deleteRequisicionProductoError } = await this.supabaseService.supabase
      .from('requisicion_producto')
      .delete()
      .eq('id_producto', id_producto);

    if (deleteRequisicionProductoError) throw deleteRequisicionProductoError;

    const { error: deleteProductoError } = await this.supabaseService.supabase
      .from('productos')
      .delete()
      .eq('id_producto', id_producto);

    if (deleteProductoError) throw deleteProductoError;
  }
}