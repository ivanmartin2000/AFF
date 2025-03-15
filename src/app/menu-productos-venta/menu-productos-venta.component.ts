import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-menu-productos-venta',
  templateUrl: './menu-productos-venta.component.html',
  styleUrls: ['./menu-productos-venta.component.scss'],
  imports: [CommonModule]
})
export class MenuProductosVentaComponent {
  // Ejemplo: categoría recibida (podrías obtenerla por route parameters)
  category = 'Electrónica';
  products = [
    { id: 1, name: 'Smartphone', price: 499 },
    { id: 2, name: 'Laptop', price: 899 },
    { id: 3, name: 'Tablet', price: 299 }
  ];
}
