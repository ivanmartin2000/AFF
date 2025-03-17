// src/app/productos-publicados/productos-publicados.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosPublicadosService, ProductoPublicado } from '../productos-publicados.service';

@Component({
  selector: 'app-productos-publicados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-publicados.component.html',
  styleUrls: ['./productos-publicados.component.scss']
})
export class ProductosPublicadosComponent implements OnInit {
  productos: ProductoPublicado[] = [];

  constructor(private productosService: ProductosPublicadosService) {}

  ngOnInit(): void {
    this.cargarProductosPublicados();
  }

  cargarProductosPublicados(): void {
    this.productosService.getProductosPublicados().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos publicados:', err);
      }
    });
  }
}
