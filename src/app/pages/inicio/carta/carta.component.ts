import { Component, OnInit } from '@angular/core';
import FiltroCategoriaComponent from "./filtro-categoria/filtro-categoria.component";
import { Categoria } from '../../../shared/models/Categoria';
import { CategoriasService } from '../../../core/services/categorias.service';
import { Observable } from 'rxjs';
import { Producto } from '../../../shared/models/Producto';
import { environment } from '../../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import ProductCardComponent from "../../../shared/components/product-card/product-card.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../../core/services/productos.service';


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
  constructor(private categoria: CategoriasService,private producto:ProductosService, private http:HttpClient, private route: ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.getCategorias();

    this.route.queryParams.subscribe(params => {
      const categoria = params['categoria'] || "Promociones";
      this.filtrarProductos(categoria);
    });

  }

  getCategorias(){
    this.categoria.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  filtrarProductos(categoria: string){
    this.http.get<Producto[]>(this.urlProductos + "/filter", { params: { categorias: [categoria] } })
      .subscribe((data: Producto[]) => {
        this.productos = data; 
        this.categoriaNombre = categoria;
        console.log(this.productos); 
      });
  }

  getProductosByCategoria(categoriaNombre: string){
    this.producto.goCartWithCategory(categoriaNombre); 
  }


}
