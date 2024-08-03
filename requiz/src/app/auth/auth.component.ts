import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private supabaseService: SupabaseService) { }

  async signIn() {
    try {
      await this.supabaseService.signIn(this.email, this.password);
      // Redirect to dashboard or other logic
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An unexpected error occurred';
      }
    }
  }
}