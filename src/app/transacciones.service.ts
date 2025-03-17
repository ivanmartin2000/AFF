import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductoVenta {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  fechaRegistro?: string;
  rutaImagen?: string;
  nombreImagen?: string;
}

export interface ProductoSubasta {
  idProducto: number;
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
export class TransaccionesService {
  private baseUrl = '/api/transacciones';

  constructor(private http: HttpClient) {}

  getSubastasActivas(): Observable<ProductoSubasta[]> {
    return this.http.get<ProductoSubasta[]>(`${this.baseUrl}/subastas-activas`);
  }

  getProductosActivos(): Observable<ProductoVenta[]> {
    return this.http.get<ProductoVenta[]>(`${this.baseUrl}/productos-activos`);
  }
}
