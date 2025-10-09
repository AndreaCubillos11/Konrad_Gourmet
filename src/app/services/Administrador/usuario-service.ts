import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = '/api/usuarios';
  private apiLogin = '/api/login';
  constructor(private http: HttpClient) { }


  consultarUsuarios(idUsuario: any, token : any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?creador_id=${idUsuario}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
  }


  login(data: any): Observable<any> {
    
    return this.http.post<any>(this.apiLogin, data, 
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      }
    );
  }

    crearUsuario(data: any,token:any): Observable<any> {
    
    return this.http.post<any>(this.apiUrl, data, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
  }

    consultarRoles(idUsuario: any, token : any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/rol?creador_id=${idUsuario}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
  }
}
