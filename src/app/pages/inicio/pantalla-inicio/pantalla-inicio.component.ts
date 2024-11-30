import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductosService } from '../../../core/services/productos.service';
import { Producto } from '../../../shared/models/Producto';
import { CarouselComponent } from "../../../shared/components/carousel/carousel.component";
import { BehaviorSubject } from 'rxjs';
import { Categoria } from '../../../shared/models/Categoria';
import { CategoriasService } from '../../../core/services/categorias.service';
import { Carousel20Component } from "../../../shared/components/carousel2.0/carousel2.0.component";

@Component({
  selector: 'app-pantalla-inicio',
  standalone: true,
  imports: [CarouselComponent, Carousel20Component],
  templateUrl: './pantalla-inicio.component.html',
  styleUrl: './pantalla-inicio.component.css'
})
export default class PantallaInicioComponent implements OnInit{
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productosList$ = this.productosSubject.asObservable();
  productosList:Producto[] = [];
  categoriaList: Categoria[] = [];
  title = "Productos Destacados";
  titleCategory = "Categorias";
  typeCard = "product";
  typeCardCategory = "category";
  ngOnInit(): void {
    initFlowbite();
    this.getPromociones();
    this.getCategorias();
  }

    constructor(private producto:ProductosService, private categoria: CategoriasService) {}

    getPromociones() {
      this.producto.getPromociones().subscribe((productos) => {
        this.productosList = productos;
        console.log(this.productosList);
        
      });
    }

    getCategorias() {
      this.categoria.getCategorias().subscribe((categorias) => {
        this.categoriaList = categorias;
        console.log(this.categoriaList);
      });
    }

}
