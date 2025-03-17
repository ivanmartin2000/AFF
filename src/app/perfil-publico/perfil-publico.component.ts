// src/app/perfil-publico/perfil-publico.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfilPublicoService, PerfilPublicoResponse } from '../perfil-publico.service';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-perfil-publico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-publico.component.html',
  styleUrls: ['./perfil-publico.component.scss']
})
export class PerfilPublicoComponent implements OnInit {
  perfil?: PerfilPublicoResponse;
  errorMessage: string = '';
  isFavorite: boolean = false; // Para manejar el estado de favoritos
  // Simula el saldo de la billetera del usuario logueado (esto lo ideal es obtenerlo desde un servicio)
  walletBalance: number = 500; 
  // Propiedad para mostrar el popup de fondos insuficientes
  showInsufficientFundsPopup: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilPublicoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.errorMessage = 'No se proporcionó un ID de usuario.';
      return;
    }
    const id = parseInt(idParam, 10);
    this.perfilService.getPerfilPublico(id).subscribe({
      next: (data) => {
        this.perfil = data;
      },
      error: (err) => {
        console.error('Error al cargar perfil público:', err);
        this.errorMessage = 'No se pudo cargar el perfil público.';
      }
    });
  }

  // Acción para "Comprar Ahora" en un producto en venta
  onBuyNow(product: any): void {
    // Aquí podrías redirigir al usuario a la página de pago o ejecutar la lógica de compra.
    console.log('Comprar ahora producto:', product);
    // Ejemplo: this.router.navigate(['/app/pago'], { queryParams: { idProducto: product.idProducto } });
  }

  // Acción para "Agregar al carrito"
  onAddToCart(product: any): void {
    // Se asume que el ID del usuario logueado se almacena en localStorage (por ejemplo, "idUsuario")
    const idUsuario = Number(localStorage.getItem('idUsuario'));
    if (!idUsuario) {
      console.error('ID de usuario no encontrado en localStorage');
      return;
    }
    this.carritoService.agregarAlCarrito(product.idProducto, 1).subscribe({
      next: (res) => {
        console.log("Producto agregado al carrito:", res);
        // Aquí podrías mostrar un mensaje de éxito o actualizar el estado del carrito.
      },
      error: (err) => {
        console.error("Error al agregar al carrito:", err);
      }
    });
  }

  // Acción para "Pujar" en un producto en subasta
  onBid(product: any): void {
    const requiredAmount = product.precio;
    if (this.walletBalance < requiredAmount) {
      // Mostrar popup de fondos insuficientes
      this.showInsufficientFundsPopup = true;
    } else {
      // Procede a realizar la puja (llamar a un servicio de pujas, por ejemplo)
      console.log('Realizar puja en producto:', product);
      // Ejemplo: this.pujaService.realizarPuja(product.idProducto, ...);
    }
  }

  // Cerrar el popup de fondos insuficientes
  closeInsufficientFundsPopup(): void {
    this.showInsufficientFundsPopup = false;
  }

  // Alternar estado de favoritos (placeholder)
  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    // Aquí llamarías a un servicio para agregar o quitar de favoritos (tabla usuario_favoritos)
    console.log("Favorito actualizado:", this.isFavorite);
  }
}
