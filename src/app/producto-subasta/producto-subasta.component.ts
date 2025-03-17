// src/app/producto-subasta/producto-subasta.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoSubastaService, ProductoSubasta } from '../producto-subasta.service';
import { CountdownPipe } from '../countdown.pipe';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PujaService, PujarRequest } from '../puja.service';

@Component({
  selector: 'app-producto-subasta',
  standalone: true,
  imports: [CommonModule, CountdownPipe, ReactiveFormsModule],
  templateUrl: './producto-subasta.component.html',
  styleUrls: ['./producto-subasta.component.scss']
})
export class ProductoSubastaComponent implements OnInit {
  productos: ProductoSubasta[] = [];
  bidModalVisible: boolean = false;
  selectedProducto?: ProductoSubasta;
  bidForm: FormGroup;
  errorMessage: string = '';

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
  }

  cargarProductosSubasta(): void {
    this.subastaService.getProductosSubasta().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos en subasta:', err);
      }
    });
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

    // Preparar la solicitud de puja.
    const request: PujarRequest = {
      idProducto: this.selectedProducto.idProducto,
      // Si tienes un campo idSubasta en ProductoSubasta, úsalo; de lo contrario, utiliza idProducto.
      idSubasta: this.selectedProducto.idSubasta || this.selectedProducto.idProducto,
      monto: monto
    };

    this.pujaService.realizarPuja(request).subscribe({
      next: (response) => {
        alert('Puja realizada con éxito.');
        this.closeBidModal();
        // Opcional: recargar la lista para actualizar el estado de la subasta.
        this.cargarProductosSubasta();
      },
      error: (err) => {
        console.error('Error al realizar la puja:', err);
        this.errorMessage = 'Error al realizar la puja. Inténtalo de nuevo.';
      }
    });
  }
}
