import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../../../core/services/carrito.service';

@Component({
  selector: 'app-cantidad-productos',
  standalone: true,
  imports: [],
  templateUrl: './cantidad-productos.component.html',
  styleUrl: './cantidad-productos.component.css'
})
export default class CantidadProductosComponent implements OnInit {
  cantidad: number = 0;
  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.carritoService.cantidadProductos$.subscribe(cantidad => {
      this.cantidad = cantidad;
    });
    this.obtenerCantidad();
  }

  obtenerCantidad() {
    const memoria = localStorage.getItem('cartProducts');
    if (!memoria) {
      this.cantidad = 0; 
      return 0; // También retornamos 0 si no hay productos
    }
    
    const memoriaParseada = JSON.parse(memoria);
    let cantidadTotal = 0; // Inicializamos cantidadTotal en 0
    
    memoriaParseada.forEach((producto: { cantidad: number; }) => {
      cantidadTotal += producto.cantidad; // Usamos += para sumar
    });
  
    this.cantidad = cantidadTotal; // Guardamos la cantidad total en la propiedad
    return cantidadTotal; // Retornamos la cantidad total
  }

}
