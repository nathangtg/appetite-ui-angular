import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Restaurant {
  name: string;
  address: string;
  image_path: string;
  cuisine: string;
  description: string;
  preparation_time: number;
  price_range: string;
}

@Component({
  selector: 'app-admin-restaurant-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './admin-restaurant-card.component.html',
  styleUrl: './admin-restaurant-card.component.css',
})
export class AdminRestaurantCardComponent {
  @Input() restaurant!: Restaurant;
}
