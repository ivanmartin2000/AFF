import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Vendedor {
  id: number;
  nombre: string;
  ventas: number;
  rating: number;
}

@Component({
  standalone: true,
  selector: 'app-ranking-vendedores',
  templateUrl: './ranking-vendedores.component.html',
  styleUrls: ['./ranking-vendedores.component.scss'],
  imports: [CommonModule]
})
export class RankingVendedoresComponent {
  vendedores: Vendedor[] = [
    { id: 1, nombre: 'Tienda Uno', ventas: 150, rating: 4.8 },
    { id: 2, nombre: 'Comercial Dos', ventas: 120, rating: 4.6 },
    { id: 3, nombre: 'Mercado Tres', ventas: 100, rating: 4.5 },
  ];
}
