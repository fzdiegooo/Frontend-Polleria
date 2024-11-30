import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CarritoService } from '../../../core/services/carrito.service';
import { CommonModule } from '@angular/common';
import ProductCard2Component from "../../../shared/components/product-card2/product-card2.component";
import { isEmpty } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ProductCard2Component],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export default class CarritoComponent implements OnInit, OnChanges{
  @Input() isOpen:boolean = false;
  @Output() close = new EventEmitter<void>();
  productosCarrito:any;
  isEmpty:number = 0;
  totalCarrito:number = 0;
  
  constructor(private carritoService: CarritoService, private router: Router){}
  
  ngOnInit(): void {
      this.obtenerProductos()
      this.isCartEmpty()
      this.obtenerTotal()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.obtenerProductos();
      this.isCartEmpty() // Actualiza los productos cada vez que el componente se renderiza
      this.obtenerTotal()
    }
  }

  cerrarCarrito(){
    this.close.emit();
  }

  obtenerProductos(){
    this.carritoService.carrito$.subscribe(carrito =>{
      this.productosCarrito = carrito
    });
  }

  isCartEmpty(){
    this.carritoService.cantidadProductos$.subscribe(cantidad=>{
      this.isEmpty = cantidad;
    })
  }

  obtenerTotal(){
    this.carritoService.totalCarrito$.subscribe(total=>{
      this.totalCarrito = total;
    })
  }

  irCarta(){
    this.router.navigate(['/carta'])
    this.cerrarCarrito()
  }

  irPagar(){
    this.router.navigate(['/checkout-payment'])
    this.cerrarCarrito()
  }

}
