import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Envio {
  id: number;
  fecha: Date;
  estado: string;
  direccion: string;
}

@Component({
  standalone: true,
  selector: 'app-ver-envios',
  templateUrl: './ver-envios.component.html',
  styleUrls: ['./ver-envios.component.scss'],
  imports: [CommonModule]
})
export class VerEnviosComponent {
  envios: Envio[] = [
    { id: 1, fecha: new Date(), estado: 'En tránsito', direccion: 'Calle Falsa 123' },
    { id: 2, fecha: new Date(), estado: 'Entregado', direccion: 'Avenida Siempre Viva 742' },
    { id: 3, fecha: new Date(), estado: 'Pendiente', direccion: 'Calle de la Amargura 456' },
  ];
}
