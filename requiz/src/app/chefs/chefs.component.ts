import { Component, OnInit } from '@angular/core';
import { ChefService } from '../services/chefs.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {
  chef = { nombre: '', matricula: '' };
  errorMessage: string = '';
  successMessage: string = '';
  chefs: any[] = [];

  constructor(private chefService: ChefService) { }

  async ngOnInit() {
    this.loadChefs();
  }

  async addChef() {
    try {
      await this.chefService.addChef(this.chef);
      this.successMessage = 'Chef added successfully!';
      this.errorMessage = '';
      this.chef = { nombre: '', matricula: '' }; // Reset the form
      await this.loadChefs(); // Reload the chefs list
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.errorMessage = 'Failed to add chef. ' + error.message;
      } else {
        this.errorMessage = 'An unexpected error occurred';
      }
      this.successMessage = '';
    }
  }

  async loadChefs() {
    try {
      this.chefs = await this.chefService.getChefs();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.errorMessage = 'Failed to load chefs. ' + error.message;
      } else {
        this.errorMessage = 'An unexpected error occurred';
      }
    }
  }
}