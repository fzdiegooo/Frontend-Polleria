import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgregarCategoriaComponent } from './form-agregar-categoria.component';

describe('FormAgregarCategoriaComponent', () => {
  let component: FormAgregarCategoriaComponent;
  let fixture: ComponentFixture<FormAgregarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAgregarCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAgregarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
