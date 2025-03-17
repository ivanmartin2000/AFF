import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransaccionesService, ProductoSubasta } from '../transacciones.service';

@Component({
  selector: 'app-subastas-activas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subastas-activas.component.html',
  styleUrls: ['./subastas-activas.component.scss']
})
export class SubastasActivasComponent implements OnInit {
  subastas: ProductoSubasta[] = [];
  errorMessage: string = '';

  constructor(private transaccionesService: TransaccionesService) {}

  ngOnInit(): void {
    this.transaccionesService.getSubastasActivas().subscribe({
      next: (data) => this.subastas = data,
      error: (err) => {
        console.error('Error al cargar subastas activas:', err);
        this.errorMessage = 'No se pudo cargar las subastas activas.';
      }
    });
  }
}
