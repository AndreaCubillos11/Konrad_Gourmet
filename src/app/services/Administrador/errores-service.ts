import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {


  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  consultarErrores(idUsuario: any, token: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/error?creador_id=${idUsuario}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
  }

  obtenerError(idUsuario: any, token: any, idError: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/error/${idError}?creador_id=${idUsuario}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
  }

    limpiarErrores(idUsuario: any, token: any,): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/error?creador_id=${idUsuario}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
  }

}
