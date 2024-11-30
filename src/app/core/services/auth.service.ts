import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ignoreElements, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Cliente, User, UserWithToken } from '../../shared/models/User';
import { LoginRequest } from '../../shared/models/LoginRequest';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiUrl + "/auth";
  private user = new BehaviorSubject<UserWithToken | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) {  
    this.loadUserFromLocalStorage();
    console.log(this.user);
    
  }

  login(credentials: LoginRequest): Observable<never> {
    return this.httpClient.post<any>(this.url + "/login", credentials).pipe(
      tap((response: any) => {
        this.saveTokenToLocalStore(response.token);
        this.pushNewUser(response.token)
        this.userService.getUserData(credentials.username).subscribe(
          (response: any) => {
            console.log(response);
            this.userService.saveDataLocalStorage(response);
          }
        );
        // Asumimos que la respuesta incluye un campo `role` para determinar el destino
        const userRole = response.rol; // Esto depende de la respuesta del backend
        
        // Realizamos la redirección dependiendo del rol
        if (userRole === 'Administrador') {
          this.redirectToDashboard();  // Redirigir al dashboard si es admin
        } else if (userRole === 'Cliente') {
          this.redirectToClientPanel();  // Redirigir al panel cliente si es cliente
        }else{
          console.log("no funciona");
        }
      }),
      ignoreElements()  // Eliminas la necesidad de devolver un valor en la respuesta
    );
  }
  /*
  login(credentials: LoginRequest): Observable<never> {
    return this.httpClient.post<any>(this.url+"/login", credentials).pipe(
      tap((response) => this.saveTokenToLocalStore(response.token)),
      tap((response) => this.pushNewUser(response.token)),
      tap(() => this.redirectToDashboard()),
      tap(() => this.redirectToClientPanel()),
      ignoreElements()
    );
  }
*/
  logout(): void {
    this.removeUserFromLocalStorage();
    this.user.next(null);
    this.userService.userData.next(null);
    this.router.navigateByUrl('/login');
  }

  private redirectToClientPanel(): void {
    this.router.navigateByUrl('/cliente/perfil');
  }

  private redirectToDashboard(): void {
    this.router.navigateByUrl('/dashboard');
  }

  private pushNewUser(token: string) {
    this.user.next(this.decodeToken(token));
  }
  
  /*
  private decodeToken(userToken: string): UserWithToken {
    const userInfo = JSON.parse(window.atob(userToken)) as User;
    
    return { ...userInfo, token: userToken };
  }
  */

  private decodeToken(userToken: string): UserWithToken {
    // El token es típicamente 3 partes separadas por '.'
    const tokenParts = userToken.split('.');
  
    if (tokenParts.length !== 3) throw new Error('Token inválido');
  
    // El payload está en la segunda parte del token (tokenParts[1])
    const base64Url = tokenParts[1];
    
    // Decodificar el payload en base64url
    const base64 = base64Url.replace('-', '+').replace('_', '/'); // Convertir base64url a base64
    const decodedPayload = window.atob(base64);
  
    // Parsear el JSON y devolver el objeto con el token
    const userInfo = JSON.parse(decodedPayload) as User;
    console.log(userInfo);
    
    return { ...userInfo, token: userToken };
  }
  
  private loadUserFromLocalStorage(): void {
    const userFromLocal = localStorage.getItem("token");

    userFromLocal && this.pushNewUser(userFromLocal);
  }
  

  private saveTokenToLocalStore(userToken: string): void {
    localStorage.setItem("token", userToken);
  }

  private removeUserFromLocalStorage(): void {
    localStorage.removeItem("token");
  }

  redirectToLogin(): any {
    this.router.navigateByUrl('/login');
  }

}
