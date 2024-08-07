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
      .select('id_categoria, nombre');
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
      .select(`
        *,
        chefs!requisiciones_id_chef_fkey ( nombre ),
        materias!requisiciones_id_materia_fkey ( modulo )
      `);
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