import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../models/Producto';
import { CarritoService } from '../../../core/services/carrito.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export default class ProductCardComponent {
  @Input() producto: any;

  @Input() imgProducto?: string = ""
  @Input() nombreProducto: string = ""
  @Input() precioProducto: number = 0


  constructor(private carritoService: CarritoService, private router:Router) {}

  agregarProducto(producto:Producto) {
    //this.carritoService.agregarProducto(producto)
    this.router.navigate( ['/producto', producto.id]);
  }
  
}
