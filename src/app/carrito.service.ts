import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// src/app/carrito.models.ts
export interface ProductoVenta {
  imagen: string;
  descripcion: string;
  precio: number;
  rutaImagen?: string;
  nombreImagen?: string;
}


export interface CarritoItem {
  idCarrito: number;
  idCliente: number;
  idProducto: number;
  cantidad: number;
  // Puedes incluir más datos, como precio total, nombre, etc.
}

export class CarritoService {

constructor(private http: HttpClient) {}

  getCarritoData(): Observable<CarritoItem> {
    // Se asume que el endpoint devuelve un objeto con las propiedades Favoritos y Sugerencias
    return this.http.get<CarritoItem>('/api/menu/principal');
  }
}
