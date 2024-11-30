import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/enviroment';
import { TipoEntrega } from '../../shared/models/TipoEntrega';

@Injectable({
  providedIn: 'root'
})
export class TipoEntregaService {

  private apiUrl = environment.apiUrl + "/tipo-entrega"; // Cambia esta URL según tu backend

  constructor(private http: HttpClient) {}

  getTiposEntrega(): Observable<TipoEntrega[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, puedes redirigir al login o manejar de otra manera
      throw new Error('No token found. Please login.');
    }

    const headers = { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + token 
    };

    return this.http.get<TipoEntrega[]>(this.apiUrl, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching TipoEntrega:', error);
          return throwError(() => new Error('Failed to fetch TipoEntrega'));
        })
      );
  }
}
