// src/app/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MejorVendedor {
  idUsuario: number | null;
  nombre: string;
  monto: number;
}

export interface MejorComprador {
  idUsuario: number | null;
  nombre: string;
  monto: number;
}

export interface RankingSubasta {
  idProducto: number;
  precioFinal: number;
}

export interface MonthlyData {
  monthLabel: string;
  total: number;
}

export interface DashboardMetrics {
  mejorVendedor: MejorVendedor;
  mejorComprador: MejorComprador;
  rankingSubastas: RankingSubasta[];
}

export interface DashboardData {
  metrics: DashboardMetrics;
  monthlyVentas: MonthlyData[];
  monthlyProductos: MonthlyData[];
  monthlySubastas: MonthlyData[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>('/api/dashboard/metrics');
  }
}
