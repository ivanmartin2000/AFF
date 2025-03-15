import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Billetera {
  idBilletera: number;
  idUsuario: number;
  monto: number;
}

@Injectable({
  providedIn: 'root'
})
export class BilleteraService {
  constructor(private http: HttpClient) {}

  getBilleteraByUser(idUsuario: number): Observable<Billetera> {
    // Se asume que el endpoint devuelve un objeto Billetera
    return this.http.get<Billetera>(`/api/billetera/usuario/${idUsuario}`);
  }
}
