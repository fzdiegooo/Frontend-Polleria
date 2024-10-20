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
}
