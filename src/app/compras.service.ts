// src/app/compras.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductoComprado {
  id: number;
  nombre: string;
  fechaCompra: Date;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private baseUrl = '/api/compras';

  constructor(private http: HttpClient) { }

  getProductosComprados(): Observable<ProductoComprado[]> {
    return this.http.get<ProductoComprado[]>(`${this.baseUrl}/productos-comprados`);
  }
}
