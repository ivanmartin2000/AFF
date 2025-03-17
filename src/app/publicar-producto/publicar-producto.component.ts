import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductosService, PublicarProductoRequest } from '../productos.service';
import { MarcasService, Marca } from '../marcas.service';
import { FormsModule } from '@angular/forms'; // Add this import

@Component({
  selector: 'app-publicar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './publicar-producto.component.html',
  styleUrls: ['./publicar-producto.component.scss']
})
export class PublicarProductoComponent implements OnInit {
  productoForm: FormGroup;
  esSubasta: boolean = false;
  errorMessage: string = '';

  // Popup para agregar marca
  showAddMarcaPopup: boolean = false;
  nuevaMarcaDesc: string = ''; // Campo temporal para la marca nueva

  // Simulación de marcas existentes (o cargadas desde un servicio real)
  marcas = [
    { idMarca: 1, descripcion: 'Marca Genérica' },
    { idMarca: 2, descripcion: 'Marca Destacada' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productosService: ProductosService,
    private marcasService: MarcasService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      rutaImagen: ['', Validators.required],
      nombreImagen: ['', Validators.required],
      tipoPublicacion: ['venta', Validators.required],
      fechaFinSubasta: [''],
      ofertaInicial: [0, [Validators.min(0)]],
      idMarca: [1, Validators.required],
      idCategoria: [1] // Opcional
    });
  }

  ngOnInit(): void {
    this.productoForm.get('tipoPublicacion')?.valueChanges.subscribe(value => {
      this.esSubasta = value.toLowerCase() === 'subasta';
      const precioControl = this.productoForm.get('precio');
      const fechaFinControl = this.productoForm.get('fechaFinSubasta');
      const ofertaInicialControl = this.productoForm.get('ofertaInicial');

      if (this.esSubasta) {
        // Para subasta: se deshabilita el precio y se requieren campos adicionales
        precioControl?.disable();
        fechaFinControl?.setValidators([Validators.required]);
        ofertaInicialControl?.setValidators([Validators.required, Validators.min(0)]);
      } else {
        precioControl?.enable();
        fechaFinControl?.clearValidators();
        ofertaInicialControl?.clearValidators();
      }
      fechaFinControl?.updateValueAndValidity();
      ofertaInicialControl?.updateValueAndValidity();
    });
  }

  // Abrir popup para agregar marca
  openAddMarcaPopup(): void {
    this.showAddMarcaPopup = true;
    this.nuevaMarcaDesc = '';
  }

  // Cerrar popup
  closeAddMarcaPopup(): void {
    this.showAddMarcaPopup = false;
    this.nuevaMarcaDesc = '';
  }

  // Método para crear la nueva marca
  onAgregarMarca(): void {
    if (!this.nuevaMarcaDesc.trim()) {
      alert('La descripción de la marca no puede estar vacía');
      return;
    }
    this.marcasService.crearMarca(this.nuevaMarcaDesc).subscribe({
      next: (marcaCreada) => {
        // Agregar la marca a la lista local
        this.marcas.push(marcaCreada);
        // Seleccionar la marca recién creada en el form
        this.productoForm.patchValue({ idMarca: marcaCreada.idMarca });
        // Cerrar el popup
        this.closeAddMarcaPopup();
      },
      error: (err) => {
        console.error('Error al crear marca:', err);
        alert('Error al crear la marca. Intente nuevamente.');
      }
    });
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      this.errorMessage = 'Por favor, completa correctamente el formulario.';
      return;
    }
    const formData = { ...this.productoForm.value } as PublicarProductoRequest;

    // Para productos en subasta: convertir fechaFinSubasta a ISO string
    if (formData.tipoPublicacion.toLowerCase() === 'subasta' && formData.fechaFinSubasta) {
      formData.fechaFinSubasta = new Date(formData.fechaFinSubasta).toISOString();
    } else {
      formData.fechaFinSubasta = undefined;
      formData.ofertaInicial = undefined;
    }

    this.productosService.publicarProducto(formData).subscribe({
      next: (res) => {
        console.log('Producto publicado:', res);
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
      // Simula la subida de archivo y asigna ruta y nombre
      const simulatedPath = 'uploads/';
      const simulatedFilename = file.name;
      this.productoForm.patchValue({ 
        rutaImagen: simulatedPath, 
        nombreImagen: simulatedFilename 
      });
    }
  }
}
