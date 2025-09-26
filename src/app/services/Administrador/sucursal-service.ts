import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private apiUrl = '/api/sucursales';
  private apiUrlP = '/api/sucursal';

  constructor(private http: HttpClient) { }


  consultarSucursales(idUsuario: any): Observable<any> {
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

  // Consulta sucursal por id
  consultarSucursalPorId(idSucursal: number, creadorId: number): Observable<any> {
    return this.http.get<any>
    (`${this.apiUrl}/${idSucursal}?creador_id=${creadorId}`,
    {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      }
    );
  }

  nuevaSucursal( data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrlP,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
         // 'Authorization': `Bearer ${token}`
        }
      });
  }

}
