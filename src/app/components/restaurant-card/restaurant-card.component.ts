import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.css',
})
export class RestaurantCardComponent {
  constructor() {}

  @Input() restaurant: any = {};

  redirectToPage() {
    console.log('Redirecting to restaurant page...');
    window.location.href = `restaurants/${this.restaurant.id}`;
  }
}
