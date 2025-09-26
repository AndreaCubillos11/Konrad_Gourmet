import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = '/api/usuarios';

  constructor(private http: HttpClient) { }

  
  consultarUsuarios(idUsuario: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?creador_id=${idUsuario}`,
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      }
    );
  }
}
