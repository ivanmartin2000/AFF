// src/app/usuarios.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

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

  // Registro de usuario y almacenamiento del ID en sessionStorage
  register(request: RegistroRequest): Observable<RegistroResponse> {
    return this.http.post<RegistroResponse>('/api/usuarios/registro', request).pipe(
      tap(response => {
        sessionStorage.setItem('userId', response.idUsuario.toString()); // Guarda el ID en sesión
      })
    );
  }

  // Obtener el ID del usuario desde sessionStorage
  getUserId(): number | null {
    const userId = sessionStorage.getItem('userId');
    return userId ? Number(userId) : null;
  }

  // Obtener el ID del usuario desde el backend (si existe un endpoint)
  getUserIdFromBackend(): Observable<number> {
    return this.http.get<number>('/api/usuarios/mi-id');
  }
  
}
