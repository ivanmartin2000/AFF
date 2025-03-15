// src/app/usuarios.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RegistroRequest {
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
  esCreador: boolean;
  socialAccount?: string;
  descripcion?: string;
}

export interface RegistroResponse {
  idUsuario: number;
  nombreCompleto: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  register(request: RegistroRequest): Observable<RegistroResponse> {
    return this.http.post<RegistroResponse>('/api/usuarios/registro', request);
  }
}
