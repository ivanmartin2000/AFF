import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-producto-compra',
  templateUrl: './producto-compra.component.html',
  styleUrls: ['./producto-compra.component.scss'],
  imports: [CommonModule]
})
export class ProductoCompraComponent implements OnInit {
  productId: number | null = null;

  // Ejemplo de datos de producto
  product = {
    id: 0,
    name: 'Producto de ejemplo',
    description: 'Descripción detallada del producto...',
    price: 999.99,
    seller: 'VendedorEjemplo'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Capturar el ID del producto desde la URL (ejemplo: /producto-compra/123)
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // Llamar a un servicio o cargar datos reales del producto usando productId.
    // Aquí simulamos que la data ya está en "this.product".
    this.product.id = this.productId || 0;
  }

  comprarProducto(): void {
    // Lógica para realizar la compra
    alert(`Has comprado el producto con ID ${this.product.id} por $${this.product.price}`);
    // Redirigir a otra página si quieres
    // this.router.navigate(['/confirmacion-compra']);
  }
}
