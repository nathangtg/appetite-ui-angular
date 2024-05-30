import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface RestaurantParameter {
  key: string;
  value: string;
  description: string;
  type: string;
  enabled: boolean;
}

@Component({
  selector: 'app-create-restaurant',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './create-restaurant.component.html',
  styleUrl: './create-restaurant.component.css',
})
export class CreateRestaurantComponent {
  @Output() createRestaurant = new EventEmitter<any>();

  restaurant: any = {};

  constructor() {
    // Initialize the restaurant object with default values
    this.restaurant = {
      name: '',
      description: '',
      address: '',
      preparation_time: '',
      cuisine: '',
      price_range: '',
    };
  }

  onSubmit(): void {
    // Log the restaurant details to the console
    console.log('Restaurant:', this.restaurant);

    // Emit the new restaurant details to the parent component
    this.createRestaurant.emit(this.restaurant);
  }
}
