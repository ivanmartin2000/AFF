// src/app/producto-subasta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductoSubasta {
  idProducto: number;
  idSubasta?: number; // Agregado opcionalmente, si lo usas
  nombre: string;
  descripcion: string;
  precio: number;
  fechaFin: string;
  rutaImagen?: string;
  nombreImagen?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductoSubastaService {
  private baseUrl = '/api/subastas';

  constructor(private http: HttpClient) {}

  getProductosSubasta(): Observable<ProductoSubasta[]> {
    return this.http.get<ProductoSubasta[]>(`${this.baseUrl}/publicados`);
  }
}
