import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Solicitudes {
  

  private apiUrl = '/api';
  constructor(private http: HttpClient) { }

    // Registrar un nueva solictud de alimentos
    registrarSolicitud(data: any, token: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/solicitud`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

      getSolicitudes(token: string, creador_id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/solicitud?creador_id=${creador_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  
}
