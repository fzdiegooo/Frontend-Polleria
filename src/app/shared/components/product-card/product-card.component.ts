import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export default class ProductCardComponent {
  @Input() imgProducto: string = ""
  @Input() nombreProducto: string = ""
  @Input() precioProducto: number = 0


  constructor() {
    
  }

  

  
}
