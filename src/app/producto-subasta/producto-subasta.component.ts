import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoSubastaService, ProductoSubasta } from '../producto-subasta.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PujaService, PujarRequest } from '../puja.service';

interface TiempoRestante {
  horas: number;
  minutos: number;
  segundos: number;
}

@Component({
  selector: 'app-producto-subasta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-subasta.component.html',
  styleUrls: ['./producto-subasta.component.scss']
})
export class ProductoSubastaComponent implements OnInit, OnDestroy {
  productos: ProductoSubasta[] = [];
  bidModalVisible: boolean = false;
  selectedProducto?: ProductoSubasta;
  bidForm: FormGroup;
  errorMessage: string = '';
  timers: { [key: number]: TiempoRestante } = {}; // Guardar tiempos en formato HH:MM:SS
  private intervalId: any;

  constructor(
    private subastaService: ProductoSubastaService,
    private fb: FormBuilder,
    private pujaService: PujaService
  ) {
    this.bidForm = this.fb.group({
      monto: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.cargarProductosSubasta();

    // Configurar el temporizador global que actualiza cada producto en subasta
    this.intervalId = setInterval(() => {
      let cambios = false;

      this.productos.forEach((producto) => {
        if (producto.fechaFin) {
          const tiempoRestante = this.calcularTiempoRestante(new Date(producto.fechaFin));

          if (this.timers[producto.idProducto]?.segundos !== tiempoRestante.segundos ||
              this.timers[producto.idProducto]?.minutos !== tiempoRestante.minutos ||
              this.timers[producto.idProducto]?.horas !== tiempoRestante.horas) {
            this.timers[producto.idProducto] = tiempoRestante;
            cambios = true;
          }
        }
      });

      if (cambios) {
        this.productos = [...this.productos]; // Forzar actualización del DOM
      }
    }, 1000);
  }

  cargarProductosSubasta(): void {
    this.subastaService.getProductosSubasta().subscribe({
      next: (data) => {
        this.productos = data;
        this.productos.forEach((producto) => {
          if (producto.fechaFin) {
            this.timers[producto.idProducto] = this.calcularTiempoRestante(new Date(producto.fechaFin));
          } else {
            this.timers[producto.idProducto] = { horas: 0, minutos: 0, segundos: 0 }; // Evita valores `undefined`
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener productos en subasta:', err);
      }
    });
  }
  

  calcularTiempoRestante(fechaFin: Date | string | null): TiempoRestante {
    if (!fechaFin) {
      return { horas: 0, minutos: 0, segundos: 0 }; // Manejo de error
    }
  
    const fecha = new Date(fechaFin);
    if (isNaN(fecha.getTime())) {
      return { horas: 0, minutos: 0, segundos: 0 }; // Si la fecha es inválida, evita errores
    }
  
    const now = new Date().getTime();
    const end = fecha.getTime();
    let segundosTotales = Math.max(0, Math.floor((end - now) / 1000));
  
    const horas = Math.floor(segundosTotales / 3600);
    segundosTotales %= 3600;
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = segundosTotales % 60;
  
    return { horas, minutos, segundos };
  }
  

  openBidModal(producto: ProductoSubasta): void {
    this.selectedProducto = producto;
    this.bidModalVisible = true;
  }

  closeBidModal(): void {
    this.bidModalVisible = false;
    this.selectedProducto = undefined;
    this.bidForm.reset();
    this.errorMessage = '';
  }

  submitBid(): void {
    if (this.bidForm.invalid || !this.selectedProducto) {
      return;
    }
    const monto = this.bidForm.value.monto;

    const request: PujarRequest = {
      idProducto: this.selectedProducto.idProducto,
      idSubasta: this.selectedProducto.idSubasta || this.selectedProducto.idProducto,
      monto: monto
    };

    this.pujaService.realizarPuja(request).subscribe({
      next: () => {
        alert('Puja realizada con éxito.');
        this.closeBidModal();
        this.cargarProductosSubasta();
      },
      error: () => {
        this.errorMessage = 'Error al realizar la puja. Inténtalo de nuevo.';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
