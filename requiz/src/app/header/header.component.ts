import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private supabaseService: SupabaseService, private router: Router) { }

  async signOut() {
    try {
      await this.supabaseService.signOut();
      this.router.navigate(['/auth']); // Redirect to login
    } catch (error) {
      console.error('Error signing out', error);
    }
  }
}