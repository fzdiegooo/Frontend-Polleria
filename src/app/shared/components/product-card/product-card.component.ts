import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../models/Producto';
import { CarritoService } from '../../../core/services/carrito.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export default class ProductCardComponent {
  @Input() producto: any;

  @Input() imgProducto: string = ""
  @Input() nombreProducto: string = ""
  @Input() precioProducto: number = 0


  constructor(private carritoService: CarritoService) {}

  agregarProducto(producto:Producto) {
    this.carritoService.agregarProducto(producto)
  }
  
}
