// src/app/productos-publicados.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductoPublicado {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  fechaRegistro: string;
  rutaImagen?: string;
  nombreImagen?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosPublicadosService {
  private baseUrl = '/api/productospublicados'; // Si en el backend usas [Route("api/[controller]")], la URL será: /api/productospublicados

  constructor(private http: HttpClient) {}

  getProductosPublicados(): Observable<ProductoPublicado[]> {
    return this.http.get<ProductoPublicado[]>(this.baseUrl);
  }
}
