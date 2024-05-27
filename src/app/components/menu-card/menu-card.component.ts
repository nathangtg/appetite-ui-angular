import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.css',
})
export class MenuCardComponent {
  // ! Debugging data only
  // @Input() menu = {
  //   name: 'Burger',
  //   price: 10,
  //   image: 'burger.jpg',
  //   description: 'A delicious burger with cheese and veggies.',
  // };

  constructor() {}

  @Input() menu: any = {};
  @Input() quantity: number = 0;
  @Output() quantityChange = new EventEmitter<any>();

  increaseQuantity() {
    console.log('Increasing quantity:', this.quantity);
    this.quantity++;
    this.quantityChange.emit({ ...this.menu, quantity: this.quantity });
    this.getQuantity();
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      this.quantity = 0;
    }
    this.quantityChange.emit({ ...this.menu, quantity: this.quantity });
  }

  addToCart() {
    this.quantity += 1;
    this.quantityChange.emit({ ...this.menu, quantity: this.quantity });
  }

  removeFromCart() {
    if (this.quantity > 0) {
      this.quantity--;
    }
    this.quantityChange.emit({ ...this.menu, quantity: this.quantity });
  }

  getQuantity() {
    console.log('Getting quantity:', this.quantity);
    console.log('Menu ID:', this.menu.id);
    console.log('Menu Name:', this.menu.name);
    return this.quantity;
  }
}
