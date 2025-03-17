import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService, CarritoItem } from '../carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carritoItems: CarritoItem[] = [];
  errorMessage: string = '';

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    const idUsuario = Number(localStorage.getItem('idUsuario'));
    if (idUsuario) {
      this.carritoService.getCarritoByUser(idUsuario).subscribe({
        next: (items) => this.carritoItems = items,
        error: (err) => {
          console.error("Error al cargar el carrito:", err);
          this.errorMessage = "No se pudo cargar el carrito.";
        }
      });
    } else {
      this.errorMessage = "No se encontró el ID de usuario.";
    }
  }
}
