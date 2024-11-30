import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgregarProductoComponent } from './form-agregar-producto.component';

describe('FormAgregarProductoComponent', () => {
  let component: FormAgregarProductoComponent;
  let fixture: ComponentFixture<FormAgregarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAgregarProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAgregarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
