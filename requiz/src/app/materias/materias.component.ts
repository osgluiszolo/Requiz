// src/app/components/materia/materia.component.ts
import { Component, OnInit } from '@angular/core';
import { ChefService } from '../services/chefs.service';
import { MateriaService } from '../services/materia-service.service.spec';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  materia = { nombre_chef: '', grupo: '', modulo: '' };
  chefs: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private chefService: ChefService,
    private materiaService: MateriaService
  ) { }

  ngOnInit() {
    this.loadChefs();
  }

  async loadChefs() {
    try {
      this.chefs = await this.chefService.getChefs();
    } catch (error) {
      this.errorMessage = 'Failed to load chefs';
    }
  }

  async addMateria() {
    try {
      await this.materiaService.addMateria(this.materia);
      this.successMessage = 'Materia added successfully!';
      this.errorMessage = '';
      this.materia = { nombre_chef: '', grupo: '', modulo: '' }; // Reset the form
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.errorMessage = 'Failed to add materia. ' + error.message;
      } else {
        this.errorMessage = 'An unexpected error occurred';
      }
      this.successMessage = '';
    }
  }
}