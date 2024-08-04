import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private supabaseService: SupabaseService) {}

  async addProducto(producto: { producto: string, cantidad: number, unidad: string }) {
    const { data, error } = await this.supabaseService.supabase
      .from('productos')
      .insert([producto])
      .select();
    if (error) throw error;
    return { data, error };
  }
}