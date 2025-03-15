import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Producto {
  id: number;
  nombre: string;
  fechaPublicacion: Date;
  estado: string;
}

@Component({
  standalone: true,
  selector: 'app-productos-publicados',
  templateUrl: './productos-publicados.component.html',
  styleUrls: ['./productos-publicados.component.scss'],
  imports: [CommonModule]
})
export class ProductosPublicadosComponent {
  productos: Producto[] = [
    { id: 1, nombre: 'Producto Publicado 1', fechaPublicacion: new Date(), estado: 'Activo' },
    { id: 2, nombre: 'Producto Publicado 2', fechaPublicacion: new Date(), estado: 'Inactivo' },
    { id: 3, nombre: 'Producto Publicado 3', fechaPublicacion: new Date(), estado: 'Activo' },
  ];
}
