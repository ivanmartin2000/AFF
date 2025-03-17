// src/app/productos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PublicarProductoRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  rutaImagen?: string;
  nombreImagen?: string;
  tipoPublicacion: string; // "venta" o "subasta"
  fechaFinSubasta?: string; 
  ofertaInicial?: number;
  idMarca: number;    // Marca seleccionada
  idCategoria: number; // Opcional si deseas categoría
}

export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  rutaImagen?: string;
  nombreImagen?: string;
  activo: boolean;
  fechaRegistro: string;
  idUsuario: number;
  fechaFin?: string | null;
  idMarca: number; // FK con Marca
  idCategoria: number; // FK con Categoría
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private baseUrl = '/api/productos';

  constructor(private http: HttpClient) {}

  publicarProducto(data: PublicarProductoRequest): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}/publicar`, data);
  }
}
