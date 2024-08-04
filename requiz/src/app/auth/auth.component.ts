import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private supabaseService: SupabaseService, private router: Router) { } // Inject Router

  async signIn() {
    try {
      await this.supabaseService.signIn(this.email, this.password);
      this.router.navigate(['/dashboard']); // Redirect to dashboard
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An unexpected error occurred';
      }
    }
  }

  async signOut() {
    try {
      await this.supabaseService.signOut();
      this.router.navigate(['/auth']); // Redirect to login
      console.log("Signed out successfully");
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An unexpected error occurred';
      }
    }
  }
}