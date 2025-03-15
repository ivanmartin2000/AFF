import { Component, OnInit, OnDestroy } from '@angular/core';
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
  // Mapea el timer (en segundos) para cada vendedor que tenga producto en subasta
  timers: { [key: number]: number } = {};

  private timerInterval: any;

  constructor(private router: Router, private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenuData().subscribe({
      next: (data) => {
        // debugger;
        console.log(data);

        console.log(data.favoritos);

        
        // Si data.Favoritos o data.Sugerencias son undefined, se asigna un array vacío.
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
  
    this.timerInterval = setInterval(() => {
      this.favoritos.forEach(fav => {
        if (fav.productoSubasta && fav.productoSubasta.fechaFin) {
          this.timers[fav.idUsuario] = this.calculateTimer(new Date(fav.productoSubasta.fechaFin));
        }
      });
    }, 1000);
  }

  calculateTimer(fechaFin: Date): number {
    const now = new Date().getTime();
    const end = fechaFin.getTime();
    return Math.max(0, Math.floor((end - now) / 1000));
  }

  // Navegación
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
    this.router.navigate(['/app/perfil-usuario'], { queryParams: { id } });
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }
}
