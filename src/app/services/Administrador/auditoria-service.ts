import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  private apiUrl = '/api';

  constructor(private http: HttpClient) { }


    consultarAuditorias(idUsuario: any, token: any): Observable<any> {
      return this.http.get<any>(
        `${this.apiUrl}/auditoria?creador_id=${idUsuario}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
    }

        obtenerAuditoria(idUsuario: any, token: any, idAuditoria: any): Observable<any> {
      return this.http.get<any>(
        `${this.apiUrl}/auditoria/${idAuditoria}?creador_id=${idUsuario}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
    }
}
