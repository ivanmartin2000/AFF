import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faBars, faTimes, faStore, faChartLine, faMedal, faThList, faGavel,
  faWallet, faUser, faShoppingCart, faMoneyBillWave, faTag, faPlus,
  faTruck, faCartShopping, faSearch
} from '@fortawesome/free-solid-svg-icons';

import { BilleteraService } from '@app/billetera.service';
import { MenuService, Categoria } from '@app/menu.service';
import { LayoutService, LayoutUser, SearchResult } from '@app/layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  // Íconos
  faBars = faBars;
  faTimes = faTimes;
  faStore = faStore;
  faChartLine = faChartLine;
  faMedal = faMedal;
  faThList = faThList;
  faGavel = faGavel;
  faWallet = faWallet;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faMoneyBillWave = faMoneyBillWave;
  faTag = faTag;
  faPlus = faPlus;
  faTruck = faTruck;
  faCartShopping = faCartShopping;
  faSearch = faSearch;

  isSideMenuOpen = false;
  showCategories = false;
  categories: Categoria[] = [];

  // Imagen y nombre del usuario logueado
  userProfileImage: string = 'assets/user-profile.png';
  userName: string = '';

  // Billetera
  billetera: any = null;

  // Búsqueda
  searchQuery: string = '';

  constructor(
    private router: Router,
    private billeteraService: BilleteraService,
    private menuService: MenuService,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.getUserLayout();
    this.getBilletera();
    this.getCategories();
  }

  // Cargar datos del usuario (imagenPerfil, nombre, etc.)
  getUserLayout(): void {
    this.layoutService.getUsuarioLayout().subscribe({
      next: (data: LayoutUser) => {
        this.userName = data.nombreCompleto;
        if (data.imagenPerfil) {
          this.userProfileImage = data.imagenPerfil;
        }
      },
      error: err => {
        console.error('Error al obtener usuario layout:', err);
      }
    });
  }

  getBilletera(): void {
    const idUsuario = this.getCurrentUserId();
    this.billeteraService.getBilleteraByUser(idUsuario).subscribe({
      next: data => {
        this.billetera = data;
      },
      error: error => {
        console.error('Error al obtener la billetera:', error);
      }
    });
  }

  getCategories(): void {
    this.menuService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    });
  }

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }

  navigateToCategory(category: Categoria): void {
  console.log('Navegando a categoría con ID:', category.id);  // Verifica si se está ejecutando la función

  this.router.navigate(['/app/ver-categorias']).then(success => {
    if (success) {
      console.log('Navegación exitosa');
    } else {
      console.error('La navegación falló');
    }
  });
  this.showCategories = false;
}


  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  mostrarDetallesBilletera(): void {
    if (this.billetera) {
      console.log('Billetera:', this.billetera);
      // Abrir modal o navegar a vista de detalles
    }
  }

  // Búsqueda
  onSearch(): void {
    if (!this.searchQuery.trim()) return;
    // Ejemplo: navegas a un componente de resultados
    // o consumes layoutService.buscar(...) para un autocomplete
    this.layoutService.buscar(this.searchQuery).subscribe({
      next: (results: SearchResult[]) => {
        console.log('Resultados de búsqueda:', results);
        // Podrías guardarlos en un array y mostrarlos en un dropdown, etc.
      },
      error: err => {
        console.error('Error al buscar:', err);
      }
    });
  }

  private getCurrentUserId(): number {
    // Ajusta según tu lógica, p.ej. parsear token
    return 1;
  }
}
