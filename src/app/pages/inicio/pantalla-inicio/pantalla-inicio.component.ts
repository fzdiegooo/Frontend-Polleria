import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductosService } from '../../../core/services/productos.service';
import { Producto } from '../../../shared/models/Producto';
import { CarouselComponent } from "../../../shared/components/carousel/carousel.component";
import { BehaviorSubject } from 'rxjs';
import ProductCardComponent from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-pantalla-inicio',
  standalone: true,
  imports: [ProductCardComponent, CarouselComponent],
  templateUrl: './pantalla-inicio.component.html',
  styleUrl: './pantalla-inicio.component.css'
})
export default class PantallaInicioComponent implements OnInit{
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productosList$ = this.productosSubject.asObservable();
  productosList:Producto[] = [];
  title = "Productos Destacados";
  typeCard = "product";
  ngOnInit(): void {
    initFlowbite();
    this.getPromociones();
  }

    constructor(private producto:ProductosService) {}

    getPromociones() {
      this.producto.getPromociones().subscribe((productos) => {
        this.productosList = productos;
        console.log(this.productosList);
        
      });
    }

}
