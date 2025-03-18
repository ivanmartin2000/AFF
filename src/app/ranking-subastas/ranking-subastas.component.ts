import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Subasta {
  id: number;
  producto: string;
  ofertas: number;
  fechaFinal: Date;
}

@Component({
  standalone: true,
  selector: 'app-ranking-subastas',
  templateUrl: './ranking-subastas.component.html',
  styleUrls: ['./ranking-subastas.component.scss'],
  imports: [CommonModule]
})
export class RankingSubastasComponent {
  subastas: Subasta[] = [
    { id: 1, producto: 'Camiseta futbol', ofertas: 25, fechaFinal: new Date(Date.now() + 48 * 3600000) },
    { id: 2, producto: 'Auto de juguete', ofertas: 18, fechaFinal: new Date(Date.now() + 72 * 3600000) },
    { id: 3, producto: 'Labial', ofertas: 8, fechaFinal: new Date(Date.now() + 24 * 3600000) },
  ];
}
