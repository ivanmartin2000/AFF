import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductosService, PublicarProductoRequest } from '../productos.service';

@Component({
  selector: 'app-publicar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './publicar-producto.component.html',
  styleUrls: ['./publicar-producto.component.scss']
})
export class PublicarProductoComponent implements OnInit {
  productoForm: FormGroup;
  esSubasta: boolean = false;
  errorMessage: string = '';

  // Simulación de marcas existentes (podrías cargarlas desde un servicio real)
  marcas = [
    { idMarca: 1, descripcion: 'Marca Genérica' },
    { idMarca: 2, descripcion: 'Marca Destacada' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productosService: ProductosService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imagen: [null],
      tipoPublicacion: ['venta', Validators.required],
      fechaFinSubasta: [''],
      ofertaInicial: [0, [Validators.min(0)]],
      idMarca: [1, Validators.required], // Valor por defecto
      idCategoria: [1], // Opcional
    });
  }

  ngOnInit(): void {
    this.productoForm.get('tipoPublicacion')?.valueChanges.subscribe(value => {
      this.esSubasta = value === 'subasta';
      const precioControl = this.productoForm.get('precio');
      const fechaFinControl = this.productoForm.get('fechaFinSubasta');
      const ofertaInicialControl = this.productoForm.get('ofertaInicial');

      if (this.esSubasta) {
        // Bloquea el precio y habilita campos de subasta
        precioControl?.disable();
        fechaFinControl?.setValidators([Validators.required]);
        ofertaInicialControl?.setValidators([Validators.required, Validators.min(0)]);
      } else {
        // Habilita precio y quita validaciones de subasta
        precioControl?.enable();
        fechaFinControl?.clearValidators();
        ofertaInicialControl?.clearValidators();
      }
      fechaFinControl?.updateValueAndValidity();
      ofertaInicialControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      this.errorMessage = 'Por favor, completa correctamente el formulario.';
      return;
    }
    const formData = { ...this.productoForm.value } as PublicarProductoRequest;

    // Convertir la fechaFinSubasta a string ISO si es subasta
    if (formData.tipoPublicacion === 'subasta' && formData.fechaFinSubasta) {
      formData.fechaFinSubasta = new Date(formData.fechaFinSubasta).toISOString();
    } else {
      formData.fechaFinSubasta = undefined;
      formData.ofertaInicial = undefined;
    }

    this.productosService.publicarProducto(formData).subscribe({
      next: (res) => {
        // Redirige o muestra un mensaje de éxito
        this.router.navigate(['/app/menu-principal']);
      },
      error: (err) => {
        console.error('Error al publicar producto:', err);
        this.errorMessage = 'Error al publicar el producto. Inténtalo nuevamente.';
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.productoForm.patchValue({ imagen: file });
    }
  }
}
