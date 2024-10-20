import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';

import { register, SwiperContainer } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from "../category-card/category-card.component";
import ProductCardComponent from '../product-card/product-card.component';

register();
@Component({
  selector: 'app-carousel',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ProductCardComponent, CategoryCardComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() title: string = '';
  @Input() typeCard: string = '';
  @Input() id: string = 'swiper-' + Math.random().toString(36).substring(2, 15); // Generar un id único para cada carrusel

  swiperElement = signal<SwiperContainer | null>(null);
  cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    // swiper parameters
    console.log(this.items);
    
    this.cdr.detectChanges();
    const swiperEl = document.querySelector(`.${this.id}`);
    const maxSlidesPerView = 5;
    console.log('cantidad de items en carousel:', this.items.length);
    const swiperOption: SwiperOptions = {
      
      //scrollbar: true,
      loop: true,
      navigation: {
        enabled: true,
        nextEl: '.swiper-button-next-' + this.id,
        prevEl: '.swiper-button-prev-' + this.id,
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        825: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 100
        },
      },
    };
    Object.assign(swiperEl!, swiperOption);
    this.swiperElement.set(swiperEl as SwiperContainer);

    this.swiperElement()?.initialize();
  }
}
