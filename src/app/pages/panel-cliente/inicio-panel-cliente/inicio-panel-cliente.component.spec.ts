import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPanelClienteComponent } from './inicio-panel-cliente.component';

describe('InicioPanelClienteComponent', () => {
  let component: InicioPanelClienteComponent;
  let fixture: ComponentFixture<InicioPanelClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioPanelClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioPanelClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
