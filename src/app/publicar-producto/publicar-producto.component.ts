import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-publicar-producto',
  templateUrl: './publicar-producto.component.html',
  styleUrls: ['./publicar-producto.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class PublicarProductoComponent {
  producto = {
    titulo: '',
    descripcion: '',
    precio: null as number | null,
    imagen: null as File | null,
    esSubasta: false
  };

  publicar(): void {
    // Aquí se enviaría la información a un servicio
    console.log('Producto publicado:', this.producto);
    alert('Producto publicado exitosamente!');
  }

  onFileChange(event: any): void {
    if(event.target.files && event.target.files.length) {
      this.producto.imagen = event.target.files[0];
    }
  }
}
