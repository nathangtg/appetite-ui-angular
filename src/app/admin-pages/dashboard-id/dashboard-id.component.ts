import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextInputFieldComponent } from '../../components/text-input-field/text-input-field.component';
import { TextAreaFieldComponent } from '../../components/text-area-field/text-area-field.component';
import { RestaurantHeaderBoxComponent } from '../../components/restaurant-header-box/restaurant-header-box.component';
import { ActionButtonComponent } from '../../components/action-button/action-button.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ToastComponent } from '../../components/toast/toast.component';

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
    ToastComponent,
    NgForOf,
  ],
  templateUrl: './dashboard-id.component.html',
  styleUrls: ['./dashboard-id.component.css'],
})
export class DashboardIdComponent {
  restaurant: Restaurant | null = null;
  restaurantId: number | null = null;
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  imageFileName: string = '';

  // Dropdown options
  priceRangeOptions: string[] = ['$', '$$', '$$$', '$$$$', '$$$$$'];
  cuisineOptions: string[] = [
    'Malay',
    'Chinese',
    'Indian',
    'Thai',
    'Western',
    'Indonesian',
    'Japanese',
    'Korean',
    'Middle-Eastern',
    'Fusion',
    'Other',
  ];

  // Toast properties
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'warning' | 'info' = 'info';

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

  // Handle file change event for image upload
  onImageChange(event: any): void {
    const file = event.target.files[0];
    this.imageFileName = file.name;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
    }
    this.showSuccessToast('Image preview updated');
  }

  // Save image method
  saveImage() {
    this.restaurantId = +this.route.snapshot.paramMap.get('id')!;

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image_path', this.selectedFile, this.selectedFile.name);

      this.restaurantService
        .editRestaurantImage(this.restaurantId, formData)
        .subscribe(
          (response) => {
            console.log('Image upload successful', response);
            this.showSuccessToast('Image uploaded successfully');
          },
          (error) => {
            console.error('Image upload failed', error);
            this.showErrorToast('Image upload failed');
          }
        );
    }
  }

  // Save changes method
  saveChanges() {
    this.restaurantId = +this.route.snapshot.paramMap.get('id')!;

    if (this.restaurant) {
      const { image_path, ...restaurantWithoutImagePath } = this.restaurant;

      this.restaurantService
        .editRestaurant(restaurantWithoutImagePath, this.restaurantId)
        .subscribe(
          () => {
            this.showSuccessToast('Restaurant details updated successfully');
          },
          (error) => {
            console.error('Error saving changes:', error);
            this.showErrorToast('Failed to save changes');
          }
        );
    }
  }

  // Delete restaurant method
  deleteRestaurant() {
    this.restaurantId = +this.route.snapshot.paramMap.get('id')!;
    this.restaurantService.deleteRestaurant(this.restaurantId).subscribe(
      () => {
        this.showSuccessToast('Restaurant deleted successfully');
      },
      (error) => {
        console.error('Error deleting restaurant:', error);
        this.showErrorToast('Failed to delete restaurant');
      }
    );
  }

  // Toast methods
  showSuccessToast(message: string) {
    this.toastMessage = message;
    this.toastType = 'success';
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000); // hide after 3 seconds
  }

  showErrorToast(message: string) {
    this.toastMessage = message;
    this.toastType = 'error';
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000); // hide after 3 seconds
  }

  showWarningToast(message: string) {
    this.toastMessage = message;
    this.toastType = 'warning';
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000); // hide after 3 seconds
  }
}
