// src/app/perfil.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaz para las direcciones del usuario
export interface Direccion {
  idDireccion: number;
  calle: string;
  numero: number;
  label: string;
  // Puedes agregar más campos, por ejemplo: IdDistrito, etc.
}

// Interfaz para las tarjetas de crédito
export interface Tarjeta {
  idTarjeta: number;
  numeroTarjeta: string;
  titular: string;
  fechaExpiracion: string; // O Date, según lo que retorne el backend
  tipoTarjeta: string;
  // Agrega otros campos si es necesario (ej. CVV, etc.)
}

// Interfaz para el perfil del usuario
export interface UsuarioPerfil {
  idUsuario: number;
  nombres: string;
  apellidos: string;
  correo: string;
  imagenPerfil?: string;
  descripcion?: string;
  // Las direcciones y tarjetas se obtienen del backend
  direcciones?: Direccion[];
  tarjetas?: Tarjeta[];
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor(private http: HttpClient) {}

  // Para obtener el perfil del usuario logueado
  getPerfilUsuario(): Observable<UsuarioPerfil> {
    return this.http.get<UsuarioPerfil>('/api/usuarios/perfil'); // Asegúrate de tener este endpoint implementado en el backend
  }

  // Para obtener el perfil público de otro usuario (recibe su id como parámetro)
  getPerfilPublico(id: number): Observable<UsuarioPerfil> {
    return this.http.get<UsuarioPerfil>(`/api/usuarios/perfil-publico/${id}`);
  }
}
