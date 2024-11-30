import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicSidebarComponent } from './dinamic-sidebar.component';

describe('DinamicSidebarComponent', () => {
  let component: DinamicSidebarComponent;
  let fixture: ComponentFixture<DinamicSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinamicSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinamicSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
