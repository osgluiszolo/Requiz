import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondensadoProductosComponent } from './condensado-productos.component';

describe('CondensadoProductosComponent', () => {
  let component: CondensadoProductosComponent;
  let fixture: ComponentFixture<CondensadoProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CondensadoProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CondensadoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
