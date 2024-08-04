// src/app/services/materia.service.ts
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  constructor(private supabaseService: SupabaseService) { }

  async addMateria(materia: { nombre_chef: string, grupo: string, modulo: string }) {
    console.log('Adding materia:', materia);
    const { data, error } = await this.supabaseService.supabase
      .from('materias')
      .insert([materia])
      .select();

    if (error) {
      console.error('Error:', error);
      throw error;
    }
    console.log('Data:', data);
    return data;
  }  
  
  async getMaterias() {
    const { data, error } = await this.supabaseService.supabase
      .from('materias')
      .select('*');
    
    if (error) {
      console.error('Error fetching materias:', error);
      throw error;
    }
    return data;
  }
}