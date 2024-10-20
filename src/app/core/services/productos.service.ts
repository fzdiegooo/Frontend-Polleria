import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../shared/models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url = environment.apiUrl + "/productos";
  constructor(private http: HttpClient ) { }

  getProductos():Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  getPromociones():Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url+"/filter", {params: {categorias: ['Promociones','Parrillas']}});
  }
}
