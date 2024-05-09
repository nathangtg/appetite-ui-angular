import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.css',
})
export class RestaurantCardComponent {
  constructor() {}

  restaurantName: string = 'Restaurant Name';
  description: string = 'This is a restaurant card component';
  cuisine: string = 'Cuisine';
  preparation_time: string = 'Preparation Time';
  price_range: string = 'Price Range';
}
