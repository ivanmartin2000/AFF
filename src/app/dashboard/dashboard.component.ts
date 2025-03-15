import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Metric {
  title: string;
  value: number;
  icon: string;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule]
})
export class DashboardComponent {
  metrics: Metric[] = [
    { title: 'Ventas Totales', value: 1500, icon: '💰' },
    { title: 'Productos Vendidos', value: 300, icon: '📦' },
    { title: 'Nuevos Usuarios', value: 120, icon: '👥' },
    { title: 'Subastas Activas', value: 45, icon: '🔨' },
    { title: 'Ranking Vendedores', value: 10, icon: '🏆' },
    { title: 'Visitas Hoy', value: 5000, icon: '👀' },
    { title: 'Productos Publicados', value: 200, icon: '➕' }
  ];
}
