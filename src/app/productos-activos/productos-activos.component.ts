import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransaccionesService, ProductoVenta } from '../transacciones.service';

@Component({
  selector: 'app-productos-activos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-activos.component.html',
  styleUrls: ['./productos-activos.component.scss']
})
export class ProductosActivosComponent implements OnInit {
  productos: ProductoVenta[] = [];
  errorMessage: string = '';

  constructor(private transaccionesService: TransaccionesService) {}

  ngOnInit(): void {
    this.transaccionesService.getProductosActivos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => {
        console.error('Error al cargar productos activos:', err);
        this.errorMessage = 'No se pudo cargar los productos activos.';
      }
    });
  }
}
