import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.css',
})
export class CartButtonComponent {
  scrollToCart() {
    const cart = document.getElementById('cart');
    if (cart) {
      cart.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
