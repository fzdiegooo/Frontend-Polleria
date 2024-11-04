import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CarritoService } from '../../../core/services/carrito.service';
import { CommonModule } from '@angular/common';
import ProductCard2Component from "../../../shared/components/product-card2/product-card2.component";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ProductCard2Component],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export default class CarritoComponent implements OnInit, OnChanges{
  constructor(private carritoService: CarritoService){}
  @Input() isOpen:boolean = false;
  @Output() close = new EventEmitter<void>();
  productosCarrito:any;

  ngOnInit(): void {
      this.obtenerProductos()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.obtenerProductos(); // Actualiza los productos cada vez que el componente se renderiza
    }
  }

  cerrarCarrito(){
    this.close.emit();
  }

  obtenerProductos(){
    this.productosCarrito = this.carritoService.obtenerProductos();
  }


}
