import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService, VendedorFavorito, Sugerencia } from '../menu.service';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit, OnDestroy {
  favoritos: VendedorFavorito[] = [];
  sugerencias: Sugerencia[] = [];
  
  // Mapea el timer (en segundos) para cada favorito que tenga productoSubasta
  timers: { [key: number]: number } = {}; 
  private intervalId: any;

  constructor(private router: Router, private menuService: MenuService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.menuService.getMenuData().subscribe({
      next: (data) => {
        console.log(data);
        this.favoritos = data.favoritos ?? [];
        this.sugerencias = data.sugerencias ?? [];

        // Inicializa el timer para cada favorito que tenga productoSubasta
        this.favoritos.forEach(fav => {
          if (fav.productoSubasta && fav.productoSubasta.fechaFin) {
            this.timers[fav.idUsuario] = this.calculateTimer(new Date(fav.productoSubasta.fechaFin));
          }
        });
      },
      error: err => console.error("Error al cargar datos del menú:", err)
    });
  
    // Actualiza el timer cada segundo
    this.intervalId = setInterval(() => {
      let cambios = false;
      this.favoritos.forEach(fav => {
        if (fav.productoSubasta && fav.productoSubasta.fechaFin) {
          const nuevoTiempo = this.calculateTimer(new Date(fav.productoSubasta.fechaFin));
          if (this.timers[fav.idUsuario] !== nuevoTiempo) {
            this.timers[fav.idUsuario] = nuevoTiempo;
            cambios = true;
          }
        }
      });
      
      if (cambios) {
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  calculateTimer(fechaFin: Date): number {
    const now = new Date().getTime();
    const end = fechaFin.getTime();
    return Math.max(0, Math.floor((end - now) / 1000));
  }

  goToProductoVenta(fav: VendedorFavorito): void {
    this.router.navigate(['/app/producto-compra'], { queryParams: { id: fav.idUsuario } });
  }

  goToProductoSubasta(fav: VendedorFavorito): void {
    this.router.navigate(['/app/producto-subasta'], { queryParams: { id: fav.idUsuario } });
  }

  pujarSubasta(fav: VendedorFavorito): void {
    this.router.navigate(['/app/producto-subasta'], { queryParams: { id: fav.idUsuario } });
  }

  goToPerfilVendedor(id: number): void {
    if (!id) {
      console.error('El id del vendedor es undefined');
      return;
    }
    this.router.navigate(['/app/perfil-publico', id]);
  }
  
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
