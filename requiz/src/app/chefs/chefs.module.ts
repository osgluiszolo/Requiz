import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChefsComponent } from './chefs.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes = [
  { path: '', component: ChefsComponent }
];

@NgModule({
  declarations: [ChefsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ChefsModule { }