import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cliente } from '../../shared/models/User';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.apiUrl + "/user";
  userData = new BehaviorSubject<Cliente | null>(null);
  userData$ = this.userData.asObservable();
  constructor(private http: HttpClient, private router:Router) { 
    const userData = this.userData.value;
    if (userData) {
      this.saveDataLocalStorage(userData);
    }
    this.loadUserDataFromLocalStorage();
  }

  loadUserDataFromLocalStorage(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.userData.next(JSON.parse(userData));
    }
  }

  getUserData(username: string): Observable<Cliente> {
    // Agregar headers con el token
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Agregar `username` como parámetro de consulta
    const params = new HttpParams().set('username', username);

    // Retornar el observable (sin suscribirse aquí)
    return this.http.get<Cliente>(this.url, { headers, params }).pipe(
      tap((userData) => {
        console.log(userData);
        this.userData.next(userData);
        console.log(this.userData$);
        
      })
    );
  }

  saveDataLocalStorage(userData: Cliente): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  obtenerRazonSocial(ruc: string): Observable<any> {
    const headers = new HttpHeaders({ 
        'content-type': 'application/json', 
        'authorization': 'Bearer ' + localStorage.getItem('token') 
    });

    const params = new HttpParams().set('ruc', ruc);  // Agregar el parámetro ruc como query param

    return this.http.post<any>(this.url + "/getRazonSocial", null, { headers, params });
}

}
