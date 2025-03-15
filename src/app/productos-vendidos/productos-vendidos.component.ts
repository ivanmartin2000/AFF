import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Producto {
  id: number;
  nombre: string;
  fechaVenta: Date;
  precio: number;
}

@Component({
  standalone: true,
  selector: 'app-productos-vendidos',
  templateUrl: './productos-vendidos.component.html',
  styleUrls: ['./productos-vendidos.component.scss'],
  imports: [CommonModule]
})
export class ProductosVendidosComponent {
  productos: Producto[] = [
    { id: 1, nombre: 'Producto Vendido 1', fechaVenta: new Date(), precio: 150 },
    { id: 2, nombre: 'Producto Vendido 2', fechaVenta: new Date(), precio: 95 },
    { id: 3, nombre: 'Producto Vendido 3', fechaVenta: new Date(), precio: 210 },
  ];
}
