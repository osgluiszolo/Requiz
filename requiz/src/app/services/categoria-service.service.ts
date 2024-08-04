import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(private supabaseService: SupabaseService) {}

  async getCategorias() {
    const { data, error } = await this.supabaseService.supabase
      .from('categorias')
      .select('*');
    if (error) throw error;
    return data;
  }

  async addCategoria(nombre: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('categorias')
      .insert([{ nombre }])
      .select();
    if (error) throw error;
    return data;
  }

  async getRequisiciones(): Promise<any[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('requisiciones')
      .select('*');
    if (error) throw error;
    return data || [];
  }

  async getRequisicionById(id: number): Promise<any> {
    const { data, error } = await this.supabaseService.supabase
      .from('requisiciones')
      .select(`
        *,
        requisicion_producto (
          id_producto,
          cantidad,
          productos ( nombre, unidad )
        )
      `)
      .eq('id_requisicion', id)
      .single();
    if (error) throw error;
    return data;
  }
}