import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-header-box',
  standalone: true,
  imports: [NgIf, NgClass, NgStyle],
  templateUrl: './restaurant-header-box.component.html',
  styleUrl: './restaurant-header-box.component.css',
})
export class RestaurantHeaderBoxComponent {
  @Input() restaurantId: string | null = null;
  @Input() restaurantName: string | null = null;
  @Input() restaurantDescription: string | null = null;
  @Input() restaurantPriceRange: number | string | null = null;
  @Input() restaurantCuisine: string | null = null;
  @Input() restaurantAddress: string | null = null;
  @Input() restaurantImage: string | null = null;
  @Input() restaurantPreparationTime: string | null = null;

  detailsExpanded = false;

  toggleDetails() {
    this.detailsExpanded = !this.detailsExpanded;
  }
}
