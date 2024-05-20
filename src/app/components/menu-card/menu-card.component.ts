import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.css',
})
export class MenuCardComponent {
  quantity: number = 0;

  // ! Debugging data only
  // @Input() menu = {
  //   name: 'Burger',
  //   price: 10,
  //   image: 'burger.jpg',
  //   description: 'A delicious burger with cheese and veggies.',
  // };

  constructor() {}

  @Input() menu: any = {};

  increaseQuantity() {
    this.quantity++;
    console.log(`Increased quantity of ${this.menu.name} to ${this.quantity}.`);
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      this.quantity = 0;
    }
  }

  addToCart() {
    this.quantity += 1;
    console.log(`Added ${this.quantity} of ${this.menu.name} to cart.`);
  }

  removeFromCart() {
    if (this.quantity > 0) {
      this.quantity--;
      console.log(`Removed ${this.menu.name} from cart.`);
    }
  }

  // ! Debugging purposes only
  getQuantity() {
    console.log('Printing quantity:');
    console.log(`Quantity: ${this.quantity}`);
    return this.quantity;
  }
}
