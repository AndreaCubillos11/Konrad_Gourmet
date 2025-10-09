import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Pedido {

  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  // Registrar un nuevo plato
  registrarPedido(data: any, token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pedido`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getPedidos(token: string, creador_id: any, id_sucursal: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pedido/activos/${id_sucursal}?creador_id=${creador_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  actualizarEstado(data: any, token: string, idPedido: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pedido/${idPedido}/estado`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  eliminarPedido(creador_id: any, token: string, idPedido: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/pedido/${idPedido}?creador_id=${creador_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

}
