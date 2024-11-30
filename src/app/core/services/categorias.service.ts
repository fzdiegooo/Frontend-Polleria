import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../../shared/models/Categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private url = environment.apiUrl + "/categoria";
  constructor(private http:HttpClient) { }

  getCategorias():Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url);
  }

  crearCategoria(categoria:Categoria):Observable<Categoria>{
    const headers = { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem('token') }
    return this.http.post<Categoria>(this.url, categoria,{headers});
  }

  editarCategoria(categoria:Categoria):Observable<Categoria>{
    const headers = { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem('token') }  
    return this.http.put<Categoria>(`${this.url}/${categoria.id}`, categoria,{headers});
  }

  eliminarCategoria(id:number):Observable<Categoria>{
    const headers = { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem('token') }
    return this.http.delete<Categoria>(`${this.url}/${id}`,{headers});
  }
}
