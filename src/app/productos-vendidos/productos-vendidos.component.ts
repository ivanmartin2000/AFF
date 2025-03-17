import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasService, ProductoVendido } from '../ventas.service';

@Component({
  selector: 'app-productos-vendidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-vendidos.component.html',
  styleUrls: ['./productos-vendidos.component.scss']
})
export class ProductosVendidosComponent implements OnInit {

  productos: ProductoVendido[] = [];

  constructor(private ventasService: VentasService) { }

  ngOnInit(): void {
    this.cargarProductosVendidos();
  }

  cargarProductosVendidos(): void {
    this.ventasService.getProductosVendidos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos vendidos:', err);
      }
    });
  }
}
