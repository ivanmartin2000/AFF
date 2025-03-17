import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BilleteraService } from '@app/billetera.service';
import { MenuService, Categoria } from '@app/menu.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html', 
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isSideMenuOpen = false;
  billetera: any = null;
  showCategories = false;
  categories: Categoria[] = [];

  constructor(
    private router: Router,
    private billeteraService: BilleteraService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    const idUsuario = this.getCurrentUserId();
    this.billeteraService.getBilleteraByUser(idUsuario).subscribe(
      (data) => {
        this.billetera = data;
        console.log('Billetera obtenida:', this.billetera);
      },
      (error) => {
        console.error('Error al obtener la billetera:', error);
      }
    );

    this.menuService.getCategorias().subscribe(
      (data: Categoria[]) => {
        this.categories = data;
        console.log('Categorías obtenidas:', this.categories);
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  mostrarDetallesBilletera(): void {
    if (this.billetera) {
      console.log('Detalles de la billetera:', this.billetera);
      // Aquí puedes abrir un modal o navegar a una vista de detalles
    } else {
      console.log('Billetera no encontrada.');
    }
  }

  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }

  navigateToCategory(category: Categoria): void {
    this.router.navigate(['/categorias', category.id]);
    this.showCategories = false;
  }

  private getCurrentUserId(): number {
    // Implementa la lógica para obtener el ID del usuario actual, por ejemplo, del token
    return 1; // Ejemplo
  }
}
