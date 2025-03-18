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
  private baseUrl = '/api/ProductosPublicados';

  constructor(private http: HttpClient) {}

  getProductosSubastaPorUsuario(idUsuario: number): Observable<any> {
    return this.http.get<any>(`/api/subastas/por-usuario/${idUsuario}`);
  }

}
