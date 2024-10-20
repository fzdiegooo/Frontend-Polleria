import { Component, OnInit } from '@angular/core';
import FiltroCategoriaComponent from "./filtro-categoria/filtro-categoria.component";
import { Categoria } from '../../../shared/models/Categoria';
import { CategoriasService } from '../../../core/services/categorias.service';
import { Observable } from 'rxjs';
import { Producto } from '../../../shared/models/Producto';
import { environment } from '../../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import ProductCardComponent from "../../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [FiltroCategoriaComponent, ProductCardComponent],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export default class CartaComponent  implements OnInit{
  categorias:Categoria[] = [];
  productos:Producto[] = [];
  categoriaNombre:string = "";
  urlProductos = environment.apiUrl + "/productos";
  constructor(private categoria: CategoriasService, private http:HttpClient){}

  ngOnInit(): void {
    this.getCategorias();
    this.getProductosByCategoria("Promociones");
  }

  getCategorias(){
    this.categoria.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  getProductosByCategoria(categoria: string): void {
    this.http.get<Producto[]>(this.urlProductos + "/filter", { params: { categorias: [categoria] } })
      .subscribe((data: Producto[]) => {
        this.productos = data; 
        this.categoriaNombre = categoria;
        console.log(this.productos); 
      });
  }
}
