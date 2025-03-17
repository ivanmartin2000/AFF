// src/app/ventas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductoVendido {
  id: number;
  nombre: string;
  fechaVenta: Date;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private baseUrl = '/api/ventas';

  constructor(private http: HttpClient) { }

  getProductosVendidos(): Observable<ProductoVendido[]> {
    return this.http.get<ProductoVendido[]>(`${this.baseUrl}/productos-vendidos`);
  }

  getProductosComprados(): Observable<ProductoVendido[]> { // Puedes usar la misma interfaz o una distinta
    return this.http.get<ProductoVendido[]>(`${this.baseUrl}/productos-comprados`);
  }
}
