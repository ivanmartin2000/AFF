// src/app/productos.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PublicarProductoRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  rutaImagen: string;
  nombreImagen: string;
  tipoPublicacion: string;
  fechaFinSubasta?: string;
  ofertaInicial?: number;
  idMarca: number;
  idCategoria: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private baseUrl = '/api/productos';

  constructor(private http: HttpClient) {}

  publicarProducto(request: PublicarProductoRequest & { imagen?: File }): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', request.nombre);
    formData.append('descripcion', request.descripcion);
    formData.append('precio', request.precio.toString());
    formData.append('stock', request.stock.toString());
    // Los siguientes campos se enviarán siempre aunque vengan vacíos
    formData.append('rutaImagen', request.rutaImagen || '/public/');
    formData.append('nombreImagen', request.nombreImagen || 'default.png');
    formData.append('tipoPublicacion', request.tipoPublicacion);
    if (request.fechaFinSubasta) {
      formData.append('fechaFinSubasta', request.fechaFinSubasta);
    }
    if (request.ofertaInicial !== undefined && request.ofertaInicial !== null) {
      formData.append('ofertaInicial', request.ofertaInicial.toString());
    }
    formData.append('idMarca', request.idMarca.toString());
    formData.append('idCategoria', request.idCategoria.toString());
    // Si se ha seleccionado una imagen, la agregamos
    if (request.imagen) {
      formData.append('Imagen', request.imagen, request.imagen.name);
    }

    return this.http.post(`${this.baseUrl}/publicar`, formData);
  }
}
