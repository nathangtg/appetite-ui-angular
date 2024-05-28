import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';
import { ActivatedRoute } from '@angular/router';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';
import { NgFor, NgIf } from '@angular/common';
import { response } from 'express';
import { error } from 'console';
import { RestaurantHeaderBoxComponent } from '../../components/restaurant-header-box/restaurant-header-box.component';
import { HomeRestaurantBreadcrumbComponent } from '../../components/home-restaurant-breadcrumb/home-restaurant-breadcrumb.component';
import { MenuSectionComponent } from '../../components/menu-section/menu-section.component';
import { CartSectionComponent } from '../../components/cart-section/cart-section.component';
import { CartButtonComponent } from '../../components/cart-button/cart-button.component';
import { OrderButtonComponent } from '../../components/order-button/order-button.component';

@Component({
  selector: 'app-menu-restaurant',
  standalone: true,
  imports: [
    MenuCardComponent,
    NgFor,
    NgIf,
    RestaurantHeaderBoxComponent,
    HomeRestaurantBreadcrumbComponent,
    MenuSectionComponent,
    CartSectionComponent,
    CartButtonComponent,
    OrderButtonComponent,
  ],
  templateUrl: './menu-restaurant.component.html',
  styleUrls: ['./menu-restaurant.component.css'],
})
export class MenuRestaurantComponent implements OnInit {
  restaurantId: string | null = null;
  restaurantName: string | null = null;
  restaurantDescription: string | null = null;
  restaurantPriceRange: string | null = null;
  restaurantCuisine: string | null = null;
  restaurantAddress: string | null = null;
  restaurantImage: string | null = null;
  restaurantPreparationTime: string | null = null;

  menuItems: any[] = [];
  itemsWithQuantity: any[] = [];

  constructor(private menuService: MenuService, private route: ActivatedRoute) {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchMenuItems();
    this.fetchRestaurantInformation();
  }

  fetchMenuItems() {
    if (this.restaurantId) {
      this.menuService.getMenuFromAPI(this.restaurantId).subscribe(
        (response) => {
          this.restaurantName = response.name;
          this.menuItems = response.menus;
        },
        (error) => {
          console.error('Error fetching menu:', error);
        }
      );
    } else {
      console.error('Restaurant ID not found in route');
    }
    console.log('Menu Items:', this.menuItems);
  }

  getItemsGreaterThanZero() {
    console.log('Getting items greater than zero');
    console.log(this.menuItems.filter((item) => item.quantity > 0));
    return this.menuItems.filter((item) => item.quantity > 0);
  }

  fetchRestaurantInformation() {
    console.log(this.restaurantName);
    if (this.restaurantId) {
      this.menuService.getRestaurantFromAPI(this.restaurantId).subscribe(
        (response) => {
          this.restaurantName = response.name;
          this.restaurantDescription = response.description;
          this.restaurantCuisine = response.cuisine;
          this.restaurantPriceRange = response.price_range;
          this.restaurantAddress = response.address;
          this.restaurantImage = response.image_path;
          this.restaurantPreparationTime = response.preparation_time;
        },
        (error) => {
          console.log('Error', error);
        }
      );
    } else {
      console.error('Restaurant ID not found');
    }
  }

  handleQuantityChange(updatedMenu: any) {
    const index = this.menuItems.findIndex(
      (item) => item.id === updatedMenu.id
    );
    if (index !== -1) {
      this.menuItems[index] = updatedMenu;
    }
  }

  getOrderedItems() {
    console.log('Getting ordered items');
    console.log(this.menuItems.filter((item) => item.quantity > 0));
    return this.menuItems.filter((item) => item.quantity > 0);
  }

  hasItemsInCart(): boolean {
    return this.menuItems.some((item) => item.quantity > 0);
  }
}
