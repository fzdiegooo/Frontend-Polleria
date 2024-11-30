import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../shared/models/Producto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url = environment.apiUrl + "/productos";
  constructor(private http: HttpClient, private router:Router ) { }

  getProductos():Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  getProductoById(id:string):Observable<Producto>{
    return this.http.get<Producto>(`${this.url}/${id}`)
  }

  //Metodo para ir al componente carta y filtrar los productos por categoria
  goCartWithCategory(categoriaNombre: string){
    this.router.navigate(['/carta'], { queryParams: { categoria: categoriaNombre } });
  }

  getPromociones():Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url+"/filter", {params: {categorias: ['Promociones','Parrillas']}});
  }

  // agregarProducto(producto:Producto):Observable<Producto>{
  //   const headers = { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem('token') }
  //   return this.http.post<Producto>(this.url, producto,{headers});
  // }

  agregarProducto(formData: FormData): Observable<Producto> {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<Producto>(this.url, formData, { headers });
  }

  editarProducto(formData:FormData):Observable<Producto>{
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.patch<Producto>(`${this.url}`,formData,{headers});
  }

  eliminarProducto(id:string):Observable<Producto>{
    const headers = { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem('token') }
    return this.http.delete<Producto>(`${this.url}/${id}`,{headers});
  }

  eliminarImagenProducto(publicId:string):Observable<any>{
    const headers = { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem('token') }
    return this.http.delete<any>(`${this.url}/image/${publicId}`,{headers});
  }
}
