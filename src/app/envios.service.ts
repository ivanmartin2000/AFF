// src/app/envios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Envio {
  idEnvio: number;
  idVenta: number;
  estadoEnvio: string;
  fechaEnvio?: string;
  trackingNumber?: string;
  fechaRegistro: string;
  // Puedes agregar más campos si es necesario (por ejemplo, dirección)
}

@Injectable({
  providedIn: 'root'
})
export class EnviosService {
  private baseUrl = '/api/envios';

  constructor(private http: HttpClient) {}

  // Envios que el usuario (como comprador) espera recibir o ya recibió
  getEnviosRecibidos(): Observable<Envio[]> {
    return this.http.get<Envio[]>(`${this.baseUrl}/recibidos`);
  }

  // Envios que el usuario (como vendedor) realizó o tiene pendientes
  getEnviosRealizados(): Observable<Envio[]> {
    return this.http.get<Envio[]>(`${this.baseUrl}/realizados`);
  }
}
