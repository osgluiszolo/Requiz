// src/app/services/chef.service.ts
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  constructor(private supabaseService: SupabaseService) { }

  async addChef(chef: { nombre: string, matricula: string }) {
    console.log('Adding chef:', chef);
    const { data, error } = await this.supabaseService.supabase
      .from('chefs')
      .insert([{ nombre: chef.nombre, matricula: chef.matricula }])
      .select();
    
    if (error) {
      console.error('Error:', error);
      throw error;
    }
    console.log('Data:', data);
    return data;
  }

  async getChefs() {
    console.log('Fetching chefs...');
    const { data, error } = await this.supabaseService.supabase
      .from('chefs')
      .select('*');
    
    if (error) {
      console.error('Error:', error);
      throw error;
    }
    console.log('Data:', data);
    return data;
  }
}