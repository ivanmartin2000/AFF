import { HttpClient } from '@angular/common/http';
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
  private baseUrl = '/api/carrito';

  constructor(private http: HttpClient) {}

  getCarritoByUser(idUsuario: number): Observable<CarritoItem[]> {
    return this.http.get<CarritoItem[]>(`${this.baseUrl}/usuario/${idUsuario}`);
  }

  agregarAlCarrito(idProducto: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/agregar`, { idProducto, cantidad });
  }
}
