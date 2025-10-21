import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Inventario {

  private apiUrl = '/api';
  constructor(private http: HttpClient) { }

  getInventarioPorSucursal(token: string, creador_id: any, idSucursal: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inventario/${idSucursal}?creador_id=${creador_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

}
