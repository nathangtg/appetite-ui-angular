import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuCardComponent } from '../menu-card/menu-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart-section',
  standalone: true,
  imports: [MenuCardComponent, NgIf, NgFor],
  templateUrl: './cart-section.component.html',
  styleUrl: './cart-section.component.css',
})
export class CartSectionComponent {
  @Input() menuItems: any[] = [];
  @Output() quantityChange = new EventEmitter<any>();

  handleQuantityChange(event: any) {
    this.quantityChange.emit(event);
  }

  hasItemsInCart() {
    return this.menuItems.some((item) => item.quantity >= 1);
  }
}
