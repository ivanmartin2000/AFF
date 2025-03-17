// src/app/perfil-publico.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioPublico {
  idUsuario: number;
  nombreCompleto: string;
  imagenPerfil: string;
  descripcion: string;
}

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

export interface PerfilPublicoResponse {
  usuario: UsuarioPublico;
  ventas: ProductoVenta[];
  subastas: ProductoSubasta[];
}

@Injectable({
  providedIn: 'root'
})
export class PerfilPublicoService {
  private baseUrl = '/api/usuarios'; // Ajusta si tu controlador está en otro lado

  constructor(private http: HttpClient) {}

  getPerfilPublico(id: number): Observable<PerfilPublicoResponse> {
    return this.http.get<PerfilPublicoResponse>(`${this.baseUrl}/perfil-publico/${id}`);
  }
}
