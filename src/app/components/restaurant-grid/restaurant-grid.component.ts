import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminRestaurantCardComponent } from '../../admin-components/admin-restaurant-card/admin-restaurant-card.component';
import { LoadingComponent } from '../loading/loading.component';
import { NgFor, NgIf } from '@angular/common';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  cuisine: string;
  description: string;
  image_path: string;
  preparation_time: number;
  price_range: string;
}

@Component({
  selector: 'app-restaurant-grid',
  standalone: true,
  imports: [AdminRestaurantCardComponent, LoadingComponent, NgIf, NgFor],
  templateUrl: './restaurant-grid.component.html',
  styleUrl: './restaurant-grid.component.css',
})
export class RestaurantGridComponent {
  @Input() restaurants: Restaurant[] = [];
  @Output() restaurantClick = new EventEmitter<Restaurant>();

  onRestaurantClick(restaurant: Restaurant) {
    this.restaurantClick.emit(restaurant);
  }
}
