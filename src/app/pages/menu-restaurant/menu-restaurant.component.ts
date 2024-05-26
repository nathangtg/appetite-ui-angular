import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';
import { ActivatedRoute } from '@angular/router';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';
import { NgFor, NgIf } from '@angular/common';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-menu-restaurant',
  standalone: true,
  imports: [MenuCardComponent, NgFor, NgIf],
  templateUrl: './menu-restaurant.component.html',
  styleUrls: ['./menu-restaurant.component.css'],
})
export class MenuRestaurantComponent implements OnInit {
  restaurantId: string | null = null;
  restaurantName: string | null = null;
  menuItems: any[] = [];

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
        },
        (error) => {
          console.log('Error', error);
        }
      );
    } else {
      console.error('Restaurant ID not found');
    }
  }
}
