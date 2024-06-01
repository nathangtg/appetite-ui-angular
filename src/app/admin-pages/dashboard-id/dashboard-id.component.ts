import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextInputFieldComponent } from '../../components/text-input-field/text-input-field.component';
import { TextAreaFieldComponent } from '../../components/text-area-field/text-area-field.component';
import { RestaurantHeaderBoxComponent } from '../../components/restaurant-header-box/restaurant-header-box.component';
import { ActionButtonComponent } from '../../components/action-button/action-button.component';
import { LoadingComponent } from '../../components/loading/loading.component';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  cuisine: string;
  description: string;
  image_path: string;
  preparation_time: number;
  price_range: number | string;
}

@Component({
  selector: 'app-dashboard-id',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    TextInputFieldComponent,
    TextAreaFieldComponent,
    RestaurantHeaderBoxComponent,
    ActionButtonComponent,
    LoadingComponent,
  ],
  templateUrl: './dashboard-id.component.html',
  styleUrl: './dashboard-id.component.css',
})
export class DashboardIdComponent {
  restaurant: Restaurant | null = null;
  restaurantId: number | null = null;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

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
      this.selectedFile = file;
    }
  }

  saveImage() {
    this.restaurantId = +this.route.snapshot.paramMap.get('id')!;

    console.log('Saving image to restaurant...');

    // Check if a file has been selected
    if (this.selectedFile) {
      console.log('Saving image to restaurant...');

      // Create FormData object
      const formData = new FormData();
      formData.append('image_path', this.selectedFile, this.selectedFile.name);

      console.log(formData);

      this.restaurantService
        .editRestaurantImage(this.restaurantId, formData)
        .subscribe(
          (response) => {
            console.log('Image upload successful', response);
          },
          (error) => {
            console.error('Image upload failed', error);
          }
        );
    }
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
