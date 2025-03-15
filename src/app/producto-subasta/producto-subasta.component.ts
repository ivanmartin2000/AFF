import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Importante


@Component({
  standalone: true,
  selector: 'app-producto-subasta',
  templateUrl: './producto-subasta.component.html',
  styleUrls: ['./producto-subasta.component.scss'],
  imports: [
    CommonModule,
    FormsModule // <-- Añadir FormsModule para usar ngModel
  ]
})

export class ProductoSubastaComponent implements OnInit {
  productId: number | null = null;
  oferta: number | null = null;

  // Ejemplo de datos de producto
  product = {
    id: 0,
    name: 'Producto en Subasta',
    description: 'Descripción del producto en subasta...',
    currentPrice: 500.00,
    seller: 'VendedorSubasta',
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // Ejemplo: 2 días a partir de ahora
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Capturar el ID del producto desde la URL (ejemplo: /producto-subasta/456)
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // Llamar a un servicio o cargar datos reales del producto usando productId.
    // Aquí simulamos que la data ya está en "this.product".
    this.product.id = this.productId || 0;
  }

  participarSubasta(): void {
    alert(`Participando en la subasta del producto ID: ${this.product.id}`);
    // Aquí podrías agregar lógica para registrar la participación.
  }

  hacerOferta(): void {
    if (this.oferta && this.oferta > this.product.currentPrice) {
      alert(`Oferta de $${this.oferta} realizada para el producto ID: ${this.product.id}`);
      // Actualiza el precio actual (opcional) o llama a un servicio
      this.product.currentPrice = this.oferta;
    } else {
      alert('La oferta debe ser mayor que el precio actual');
    }
  }
}
