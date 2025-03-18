import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LayoutUser {
  idUsuario: number;
  nombreCompleto: string;
  imagenPerfil?: string;
}

export interface SearchResult {
  tipo: string;    // "usuario" | "producto"
  id: number;
  nombre: string;
  imagen?: string;
  precio?: number; // si es producto
}

@Injectable({ providedIn: 'root' })
export class LayoutService {
  constructor(private http: HttpClient) {}

  getUsuarioLayout(): Observable<LayoutUser> {
    return this.http.get<LayoutUser>('/api/layout/usuario');
  }

  buscar(query: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>('/api/layout/buscar', {
      params: { query }
    });
  }
}
