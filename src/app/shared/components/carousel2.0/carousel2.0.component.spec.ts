import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carousel20Component } from './carousel2.0.component';

describe('Carousel20Component', () => {
  let component: Carousel20Component;
  let fixture: ComponentFixture<Carousel20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carousel20Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carousel20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
