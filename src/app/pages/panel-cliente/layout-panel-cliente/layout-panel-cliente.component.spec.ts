import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPanelClienteComponent } from './layout-panel-cliente.component';

describe('LayoutPanelClienteComponent', () => {
  let component: LayoutPanelClienteComponent;
  let fixture: ComponentFixture<LayoutPanelClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutPanelClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutPanelClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
