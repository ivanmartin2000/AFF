// src/app/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  correo: string;
  clave: string;
}

export interface LoginResponse {
  token: string;
  nombreCompleto: string;
  nivel: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', request)
      .pipe(
        tap(response => {
          // Guarda el token en localStorage para que el interceptor lo pueda utilizar
          localStorage.setItem('token', response.token);
        })
      );
  }

   // Método para obtener el ID del usuario desde el token sin librerías externas
   getUserId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;  // Si no hay token, retorna null

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar la parte del payload
      return payload.userId || 26;  // Devolver el ID del usuario si existe
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }
}
