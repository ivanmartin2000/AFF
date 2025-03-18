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
      //PEDILE A CHATGPT O MEJOR HACELO VOS CON TUS CONOCIMIENTOS
      // QUE DONDE DICE EL ID "26" DEBERIA IR EL ID DE USUARIO DE LA SESION. PEDILE QUE EN TODO TU HISTORIAL
      //REVISE COMO PUEDE TOMAR EL ID DEL USUARIO QUE ESTÁ EN LA SESION PARA PASARLO POR AHÍ

      //! ACORDATE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //? QUE SE DEBE PASAR UN ENTERO!!! ENTERO ES UN NUMERO DEL [1 - INFINITO] SI SABES TANTO HUBIESES HECHO
      //! ESTO SOLO PEDAZO DE PUTO

      // MAS VALE QUE ESTE HEHCO PARA MAÑANA

      //? SALUDOS


      this.carritoService.getCarritoByUser(26).subscribe({
        next: (items) => this.carritoItems = items,
        error: (err) => {
          console.error("Error al cargar el carrito:", err);
          this.errorMessage = "No se pudo cargar el carrito.";
        }
      });
    } 
}

