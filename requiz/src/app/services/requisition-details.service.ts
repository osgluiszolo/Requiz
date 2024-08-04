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
}