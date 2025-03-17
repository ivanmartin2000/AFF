// src/app/ver-envios/ver-envios.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnviosService, Envio } from '../envios.service';

@Component({
  selector: 'app-ver-envios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-envios.component.html',
  styleUrls: ['./ver-envios.component.scss']
})
export class VerEnviosComponent implements OnInit {
  enviosRecibidos: Envio[] = [];
  enviosRealizados: Envio[] = [];
  errorMessage: string = '';

  constructor(private enviosService: EnviosService) {}

  ngOnInit(): void {
    this.cargarEnvios();
  }

  cargarEnvios(): void {
    this.enviosService.getEnviosRecibidos().subscribe({
      next: (data) => {
        this.enviosRecibidos = data;
      },
      error: (err) => {
        console.error('Error al obtener envíos recibidos:', err);
        this.errorMessage = 'Error al cargar envíos recibidos';
      }
    });

    this.enviosService.getEnviosRealizados().subscribe({
      next: (data) => {
        this.enviosRealizados = data;
      },
      error: (err) => {
        console.error('Error al obtener envíos realizados:', err);
        this.errorMessage = 'Error al cargar envíos realizados';
      }
    });
  }
}
