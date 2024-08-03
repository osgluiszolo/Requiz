import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = 'https://your-supabase-url.supabase.co'; // Replace with your Supabase URL
  private supabaseKey = 'your-supabase-key'; // Replace with your Supabase Key
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error;
    return data.user; // Access the user property from the data object
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data.user; // Access the user property from the data object
  }
}
