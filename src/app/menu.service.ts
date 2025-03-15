import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductoVenta {
  imagen: string;
  descripcion: string;
  precio: number;
  rutaImagen?: string;
  nombreImagen?: string;
}

export interface ProductoSubasta {
  imagen: string;
  descripcion: string;
  precio: number;
  fechaFin: string; // Se recibe como string, se convertirá a Date en el componente si es necesario
  rutaImagen?: string;
  nombreImagen?: string;
}

export interface VendedorFavorito {
  idUsuario: number;
  nombre: string;
  imagenPerfil: string;
  descripcion: string;
  productoVenta?: ProductoVenta | null;
  productoSubasta?: ProductoSubasta | null;
}

export interface Sugerencia {
  idUsuario: number;
  nombre: string;
  imagenPerfil: string;
}

export interface MenuData {
  favoritos: VendedorFavorito[];
  sugerencias: Sugerencia[];
}

export interface Categoria {
  id: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getMenuData(): Observable<MenuData> {
    // Se asume que el endpoint devuelve un objeto con las propiedades Favoritos y Sugerencias
    return this.http.get<MenuData>('/api/menu/principal');
  }

   // Nuevo método para obtener las categorías con la URL correcta
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('/api/menu/categorias');
  }

}
