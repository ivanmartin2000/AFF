// src/app/productos-comprados/productos-comprados.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasService, ProductoComprado } from '../compras.service';

@Component({
  selector: 'app-productos-comprados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-comprados.component.html',
  styleUrls: ['./productos-comprados.component.scss']
})
export class ProductosCompradosComponent implements OnInit {
  productos: ProductoComprado[] = [];

  constructor(private comprasService: ComprasService) { }

  ngOnInit(): void {
    this.cargarProductosComprados();
  }

  cargarProductosComprados(): void {
    this.comprasService.getProductosComprados().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos comprados:', err);
      }
    });
  }
}
