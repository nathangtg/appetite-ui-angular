import { RecommendationService } from './../../services/recommendation/recommendation.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { CommonModule, NgFor } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    RestaurantCardComponent,
    HeaderComponent,
    NgFor,
    CommonModule,
    SearchBarComponent,
    FormsModule,
  ],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css',
})
export class RestaurantsComponent {
  restaurants: any[] = [];
  username: string = 'Foodie';
  filteredRestaurants: any[] = [];
  recommendedRestaurants: any[] = [];
  recentlyOrderedRestaurants: any[] = [];
  ratings = [1, 2, 3, 4, 5];
  selectedRating = '';
  cuisines = [
    { value: 'malay', display: 'Malay' },
    { value: 'chinese', display: 'Chinese' },
    { value: 'indian', display: 'Indian' },
    { value: 'thai', display: 'Thai' },
    { value: 'western', display: 'Western' },
    { value: 'indonesian', display: 'Indonesian' },
    { value: 'japanese', display: 'Japanese' },
    { value: 'korean', display: 'Korean' },
    { value: 'middle-eastern', display: 'Middle Eastern' },
    { value: 'fusion', display: 'Fusion' },
    { value: 'other', display: 'Other' },
  ];
  selectedCuisine = '';

  constructor(
    private restaurantService: RestaurantService,
    private recommendationService: RecommendationService,
    private accountService: AccountService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.fetchRestaurants();
  }

  getUserInformation() {
    this.accountService.getProfile().subscribe({
      next: (response: any) => {
        console.log('User Information:', response);
        this.username = response.name;
      },
      error: (error) => {
        console.error('Error fetching user information:', error);
      },
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      this.getUserInformation();
      this.fetchRecommendedRestaurants();
      this.fetchRecentlyOrderedRestaurants();
      return true;
    }
    return false;
  }

  selectCuisine(cuisine: string) {
    this.selectedCuisine = cuisine;
    this.filterByCuisine();
  }

  fetchRestaurants() {
    this.restaurantService.getRestaurantsFromAPI().subscribe(
      (restaurants) => {
        this.restaurants = restaurants;
        this.filteredRestaurants = [...this.restaurants];
        console.log('Restaurants:', this.restaurants);
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }

  fetchRecommendedRestaurants() {
    this.recommendationService.getRecommendations().subscribe(
      (recommendations) => {
        this.recommendedRestaurants = recommendations;
        console.log('Recommended Restaurants:', this.recommendedRestaurants);
      },
      (error) => {
        console.error('Error fetching recommendations:', error);
      }
    );
  }

  fetchRecentlyOrderedRestaurants() {
    this.restaurantService.fetchRecentlyOrderedRestaurants().subscribe(
      (recentlyOrderedRest) => {
        this.recentlyOrderedRestaurants = recentlyOrderedRest;
        console.log(
          'Recently Ordered Restaurants:',
          this.recentlyOrderedRestaurants
        );
      },
      (error) => {
        console.error('Error fetching recently ordered restaurants:', error);
      }
    );
  }

  onSearch(searchTerm: string) {
    let filtered = this.restaurants;

    if (searchTerm) {
      filtered = filtered.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.filteredRestaurants = filtered;
    } else {
      filtered = [...this.restaurants];
      this.filteredRestaurants = filtered;
    }
  }

  applyFilters() {
    let filtered = this.restaurants;

    if (this.selectedRating) {
      filtered = filtered.filter((r) => r.rating >= this.selectedRating);
    }

    if (this.selectedCuisine) {
      filtered = filtered.filter((r) => r.cuisine === this.selectedCuisine);
    }

    if (this.selectedRating && this.selectedCuisine) {
      filtered = filtered.filter(
        (r) =>
          r.rating >= this.selectedRating && r.cuisine === this.selectedCuisine
      );
    }

    this.filteredRestaurants = filtered;
  }

  filterByRating() {
    let filtered = this.restaurants;

    if (this.selectedRating !== '') {
      filtered = filtered.filter(
        (r) => parseFloat(r.average_rating) >= parseFloat(this.selectedRating)
      );
    }

    if (this.selectedCuisine) {
      filtered = filtered.filter((r) => r.cuisine === this.selectedCuisine);
    }

    this.filteredRestaurants = filtered;
  }

  filterByCuisine() {
    this.applyFilters();
  }

  resetFilters() {
    this.selectedRating = '';
    this.selectedCuisine = '';
    this.filteredRestaurants = [...this.restaurants];
  }

  filterPanelCollapsed = true;

  toggleFilterPanel() {
    this.filterPanelCollapsed = !this.filterPanelCollapsed;
  }
}
