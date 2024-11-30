import { Injectable } from '@angular/core';
import { Pedido } from '../../shared/models/Pedido';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private url = environment.apiUrl + '/pedidos';

  constructor(private http: HttpClient) {}

  guardarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.url}`, pedido);
  }

  obtenerPedidosPorUsuario(usuarioId: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.url}/${usuarioId}`);
  }
}
