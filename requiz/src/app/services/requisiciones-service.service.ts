import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class RequisicionesService {
  constructor(private supabaseService: SupabaseService) {}

  async getMaterias(): Promise<any[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('materias')
      .select('*');
    if (error) throw error;
    return data || [];
  }

  async getChefs(): Promise<any[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('chefs')
      .select('*');
    if (error) throw error;
    return data || [];
  }

  async addRequisicion(requisicion: any): Promise<any> {
    const { data, error } = await this.supabaseService.supabase
      .from('requisiciones')
      .insert([requisicion])
      .select();
    if (error) throw error;
    return data;
  }

  async addProducto(producto: any): Promise<any> {
    const { data, error } = await this.supabaseService.supabase
      .from('productos')
      .insert([producto])
      .select();
    if (error) throw error;
    return data;
  }

  async addRequisicionProducto(requisicionProducto: any): Promise<any> {
    const { data, error } = await this.supabaseService.supabase
      .from('requisicion_producto')
      .insert([requisicionProducto])
      .select();
    if (error) throw error;
    return data;
  }

  async addCategoriaProducto(categoriaProducto: any): Promise<any> {
    const { data, error } = await this.supabaseService.supabase
      .from('categoria_producto')
      .insert([categoriaProducto])
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

  async getProductosByRequisicionId(id: number): Promise<any[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('requisicion_producto')
      .select(`
        id_producto,
        productos (
          producto,
          unidad
        )
      `)
      .eq('id_requisicion', id);
    if (error) throw error;
    return data || [];
  }
}