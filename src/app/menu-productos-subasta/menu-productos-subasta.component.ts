import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-menu-productos-subasta',
  templateUrl: './menu-productos-subasta.component.html',
  styleUrls: ['./menu-productos-subasta.component.scss'],
  imports: [CommonModule]
})
export class MenuProductosSubastaComponent {
  category = 'Electrónica';
  products = [
    { id: 1, name: 'Smartphone Subasta', currentBid: 350 },
    { id: 2, name: 'Laptop Subasta', currentBid: 600 },
    { id: 3, name: 'Tablet Subasta', currentBid: 200 }
  ];
}
