import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Proveedores {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  consultarSucursales(idUsuario: any, token: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/proveedores?creador_id=${idUsuario}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
  }


  login(data: any,token:any): Observable<any> {

    return this.http.post<any>(  `${this.apiUrl}/proveedores`, data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
  }
}
