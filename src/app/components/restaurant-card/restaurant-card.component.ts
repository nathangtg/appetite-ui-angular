import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.css',
})
export class RestaurantCardComponent {
  constructor() {}

  @Input() restaurant: any = {};

  formatCuisine(cuisine: string): string {
    switch (cuisine) {
      case 'malay':
        return 'Malay';
      case 'chinese':
        return 'Chinese';
      case 'indian':
        return 'Indian';
      case 'thai':
        return 'Thai';
      case 'western':
        return 'Western';
      case 'indonesian':
        return 'Indonesian';
      case 'japanese':
        return 'Japanese';
      case 'korean':
        return 'Korean';
      case 'middle-eastern':
        return 'Middle Eastern';
      case 'fusion':
        return 'Fusion';
      case 'other':
        return 'Other';
      default:
        return cuisine; // Return the original cuisine if no match
    }
  }
  redirectToPage() {
    console.log('Redirecting to restaurant page...');
    window.location.href = `restaurants/${this.restaurant.id}`;
  }
}
