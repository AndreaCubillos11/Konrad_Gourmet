import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListasDesplegables {


  private apiUrl = '/api/lista-CategoriaPlato';

  constructor(private http: HttpClient) { }

  nuevaCategoriaPlato(data: any,token:any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }

  nuevaCategoriaProducto(data: any,token:any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  }
}
