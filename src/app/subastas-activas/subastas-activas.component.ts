import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransaccionesService, ProductoSubasta } from '../transacciones.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PujaService, PujarRequest } from '../puja.service';

@Component({
  selector: 'app-subastas-activas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subastas-activas.component.html',
  styleUrls: ['./subastas-activas.component.scss']
})
export class SubastasActivasComponent implements OnInit, OnDestroy {
  subastas: ProductoSubasta[] = [];
  errorMessage: string = '';
  bidModalVisible: boolean = false;
  selectedSubasta?: ProductoSubasta;
  bidForm: FormGroup;

  constructor(
    private transaccionesService: TransaccionesService,
    private fb: FormBuilder,
    private pujaService: PujaService
  ) {
    this.bidForm = this.fb.group({
      monto: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.transaccionesService.getSubastasActivas().subscribe({
      next: (data) => this.subastas = data,
      error: (err) => {
        console.error('Error al cargar subastas activas:', err);
        this.errorMessage = 'No se pudo cargar las subastas activas.';
      }
    });
  }

  // Abre el modal para realizar la puja
  openBidModal(subasta: ProductoSubasta): void {
    this.selectedSubasta = subasta;
    this.bidModalVisible = true;
  }

  // Cierra el modal de puja
  closeBidModal(): void {
    this.bidModalVisible = false;
    this.selectedSubasta = undefined;
    this.bidForm.reset();
    this.errorMessage = '';
  }

  // Enviar la puja al servicio
  submitBid(): void {
    if (this.bidForm.invalid || !this.selectedSubasta) {
      return;
    }
    const monto = this.bidForm.value.monto;

    const request: PujarRequest = {
      idProducto: this.selectedSubasta.idProducto,
      idSubasta: this.selectedSubasta.idProducto || this.selectedSubasta.idProducto,
      monto: monto
    };

    this.pujaService.realizarPuja(request).subscribe({
      next: () => {
        alert('Puja realizada con éxito.');
        this.closeBidModal();
        this.ngOnInit(); // Recargar las subastas activas
      },
      error: () => {
        this.errorMessage = 'Error al realizar la puja. Inténtalo de nuevo.';
      }
    });
  }

  ngOnDestroy(): void {
    // Limpiar intervalos o recursos si es necesario
  }
}
