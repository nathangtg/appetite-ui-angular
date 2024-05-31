import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { TextInputFieldComponent } from '../../components/text-input-field/text-input-field.component';
import { TextAreaFieldComponent } from '../../components/text-area-field/text-area-field.component';

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
  imports: [
    FormsModule,
    NgFor,
    TextInputFieldComponent,
    TextAreaFieldComponent,
  ],
  templateUrl: './create-restaurant.component.html',
  styleUrl: './create-restaurant.component.css',
})
export class CreateRestaurantComponent {
  @Output() createRestaurant = new EventEmitter<any>();

  restaurant: any = {};

  constructor(private restaurantService: RestaurantService) {
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

    // Call service to create the restaurant
    this.restaurantService.createRestaurant(this.restaurant).subscribe();
  }
}
