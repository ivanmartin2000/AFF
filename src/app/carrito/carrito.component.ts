import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService, CarritoItem } from '../carrito.service';
import { UsuariosService } from '@app/usuarios.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  providers: [UsuariosService], // Corrección aquí
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carritoItems: CarritoItem[] = [];
  errorMessage: string = '';

  constructor(private carritoService: CarritoService, private usuariosService: UsuariosService) {} // También corregí el nombre para mantener coherencia

  ngOnInit(): void {
    const userId = this.usuariosService.getUserId();
    
    console.log(userId);
    
    if (userId) {
      this.cargarCarrito(userId);
    } else {
      this.usuariosService.getUserIdFromBackend().subscribe({
        next: (id) => {
          sessionStorage.setItem('userId', id.toString()); // Guarda el ID para futuras sesiones
          this.cargarCarrito(id);
        },
        error: () => this.errorMessage = "No se pudo obtener el ID del usuario."
      });
    }
  }

  private cargarCarrito(userId: number): void {
    this.carritoService.getCarritoByUser(userId).subscribe({
        next: (items) => this.carritoItems = items,
        error: (err) => {
            console.error("Error al cargar el carrito:", err);
            this.errorMessage = "No se pudo cargar el carrito.";
        }
    });
}
  
}
