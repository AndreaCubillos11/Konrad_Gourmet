import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrarPlatoService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  // Registrar un nuevo plato
  registrarPlato(data: any, token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/plato`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Listar categorías de platos
  getCategoriasPlato(token: string, creador_id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lista-CategoriaPlato/creador_id=${creador_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Listar categorías de productos
  getCategoriasProducto(token: string, creador_id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lista-CategoriaProducto/creador_id=${creador_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Listar unidades de medida
  getUnidades(token: string, creador_id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lista-UnidadMedida/creador_id=${creador_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }



  // Listar categorías de platos
  getProductoPorCategoria(token: string, creador_id: any, categoriaProducto: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lista-producto/categoria/${categoriaProducto}?creador_id=${creador_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  getPlatos(token: string, creador_id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/menu?creador_id=${creador_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  eliminarPlato(data: any, token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/plato/eliminar`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  getMarcas(token: string, creador_id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/menu?creador_id=${creador_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

}
