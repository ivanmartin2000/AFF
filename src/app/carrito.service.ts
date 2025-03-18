import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CarritoItem {
  idCarrito: number;
  idProducto: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseUrl = '/api/carrito';  // URL completa del backend

  constructor(private http: HttpClient) {}

  // Obtener el carrito de un usuario por ID
  getCarritoByUser(idUsuario: number): Observable<CarritoItem[]> {
    return this.http.get<CarritoItem[]>(`${this.baseUrl}/usuario/${idUsuario}`);
  }

  // Agregar un producto al carrito
  agregarAlCarrito(idProducto: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/agregar`, { idProducto, cantidad });
  }
}
