import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarProductoComponent } from './form-editar-producto.component';

describe('FormEditarProductoComponent', () => {
  let component: FormEditarProductoComponent;
  let fixture: ComponentFixture<FormEditarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditarProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
