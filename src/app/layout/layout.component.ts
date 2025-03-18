import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BilleteraService } from '@app/billetera.service';
import { MenuService, Categoria } from '@app/menu.service';

// Importar FontAwesomeModule y los íconos que usarás
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faTimes,
  faStore,
  faChartLine,
  faMedal,
  faThList,
  faGavel,
  faWallet,
  faUser,
  faShoppingCart,
  faMoneyBillWave,
  faTag,
  faPlus,
  faTruck,
  faCartShopping,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  standalone: true,
  // Importamos FontAwesomeModule para poder usar <fa-icon>
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  // Control del menú lateral
  isSideMenuOpen = false;

  // Datos de billetera y categorías
  billetera: any = null;
  showCategories = false;
  categories: Categoria[] = [];

  // Definición de íconos de Font Awesome
  faBars = faBars;
  faTimes = faTimes;
  faStore = faStore;
  faChartLine = faChartLine;
  faMedal = faMedal;
  faThList = faThList;
  faGavel = faGavel;
  faWallet = faWallet;
  faUser = faUser;
  faShoppingCart = faShoppingCart;  // Para “Comprados”
  faMoneyBillWave = faMoneyBillWave; // Para “Vendidos”
  faTag = faTag;                     // Para “En Venta”
  faPlus = faPlus;                   // Para “Publicar”
  faTruck = faTruck;                 // Para “Envíos”
  faCartShopping = faCartShopping;   // Para “Carrito”
  faSearch = faSearch;               // Para buscar

  constructor(
    private router: Router,
    private billeteraService: BilleteraService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    const idUsuario = this.getCurrentUserId();

    // Obtener billetera
    this.billeteraService.getBilleteraByUser(idUsuario).subscribe({
      next: (data) => {
        this.billetera = data;
        console.log('Billetera obtenida:', this.billetera);
      },
      error: (error) => {
        console.error('Error al obtener la billetera:', error);
      }
    });

    // Obtener categorías
    this.menuService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categories = data;
        console.log('Categorías obtenidas:', this.categories);
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    });
  }

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  mostrarDetallesBilletera(): void {
    if (this.billetera) {
      console.log('Detalles de la billetera:', this.billetera);
      // Aquí podrías abrir un modal o navegar a una vista de detalles
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

  // Ejemplo de obtener ID de usuario
  private getCurrentUserId(): number {
    // Ajusta la lógica para extraer el ID del token, etc.
    return 1; // Ejemplo
  }
}
