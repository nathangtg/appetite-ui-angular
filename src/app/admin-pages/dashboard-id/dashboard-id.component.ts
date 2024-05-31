import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

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
  selector: 'app-dashboard-id',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './dashboard-id.component.html',
  styleUrl: './dashboard-id.component.css',
})
export class DashboardIdComponent {
  restaurant: Restaurant | null = null;
  restaurantId: number | null = null;
  imagePreview: string | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.restaurantId = +this.route.snapshot.paramMap.get('id')!;

    this.restaurantService.getRestaurantsForAdmin().subscribe((response) => {
      this.restaurant = response.find(
        (restaurant: Restaurant) => restaurant.id === this.restaurantId
      );
    });
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitImage(): void {
    console.log('Uploading image...');
  }

  saveChanges() {
    this.restaurantId = +this.route.snapshot.paramMap.get('id')!;

    if (this.restaurant) {
      console.log('Saving changes to restaurant details...');
      console.log(this.restaurant);

      // Create a copy of the restaurant object without the image_path property
      const { image_path, ...restaurantWithoutImagePath } = this.restaurant;

      this.restaurantService
        .editRestaurant(restaurantWithoutImagePath, this.restaurantId)
        .subscribe();
    }
  }
}