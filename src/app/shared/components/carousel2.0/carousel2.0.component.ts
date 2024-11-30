import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CategoryCardComponent } from "../category-card/category-card.component";
import ProductCardComponent from "../product-card/product-card.component";

@Component({
  selector: 'app-carousel2',
  standalone: true,
  imports: [CarouselModule, CategoryCardComponent, ProductCardComponent],
  templateUrl: './carousel2.0.component.html',
  styleUrl: './carousel2.0.component.css'
})
export class Carousel20Component implements OnInit {
  @Input() items: any[] = [];
  @Input() typeCard: string = "";
  @Input() title: string = "";
  @Input() cantMax: number = 0;

  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this.responsiveOptions = [
      {
          breakpoint: '1280px',
          numVisible: this.cantMax-1,
          numScroll: 1
      },
      {
          breakpoint: '1023px',
          numVisible: this.cantMax-2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: this.cantMax-3 || 1,
          numScroll: 1
      }
  ];
  }

}
