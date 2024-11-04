import { Component, Input } from '@angular/core';
import { CarritoService } from '../../../core/services/carrito.service';
import { Producto } from '../../models/Producto';

@Component({
  selector: 'app-product-card2',
  standalone: true,
  imports: [],
  templateUrl: './product-card2.component.html',
  styleUrl: './product-card2.component.css'
})
export default class ProductCard2Component {
  @Input() producto: any;
  constructor(private carritoService: CarritoService){}

  aumentarCantidad(producto: Producto){
    this.carritoService.agregarProducto(producto);
    this.producto.cantidad++
  }


}
