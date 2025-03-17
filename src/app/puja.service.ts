// src/app/puja.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PujarRequest {
  idProducto: number;
  idSubasta: number; // O puedes omitirlo si no usas una tabla de subastas separada
  monto: number;
}

@Injectable({
  providedIn: 'root'
})
export class PujaService {
  private baseUrl = '/api/puja';

  constructor(private http: HttpClient) {}

  realizarPuja(request: PujarRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/realizar`, request);
  }
}
