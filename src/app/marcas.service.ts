// src/app/marcas.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Marca {
  idMarca: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  private baseUrl = '/api/marcas';

  constructor(private http: HttpClient) {}

  crearMarca(descripcion: string): Observable<Marca> {
    return this.http.post<Marca>(this.baseUrl, { descripcion });
  }
}
