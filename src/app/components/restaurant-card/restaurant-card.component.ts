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

  @Input() restaurantName: string = '';
  @Input() description: string = '';
  @Input() cuisine: string = '';
  @Input() preparationTime: string = '';
  @Input() priceRange: string = '';
  @Input() className: string = '';
}
