import { Component } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';
import { ActivatedRoute } from '@angular/router';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-menu-restaurant',
  standalone: true,
  imports: [MenuCardComponent, NgFor],
  templateUrl: './menu-restaurant.component.html',
  styleUrl: './menu-restaurant.component.css',
})
export class MenuRestaurantComponent {
  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute
  ) {}

  // * Get restaurant ID from Route
  restaurantId = this.route.snapshot.paramMap.get('id');

  ngOnInit() {
    this.fetchMenuItems();
    console.log('Menus', this.menuItems);
  }

  menuItems: any[] = [];

  fetchMenuItems() {
    const restaurantId = '1'; // ! TODO: Replace with the actual restaurant ID from the route
    this.menuService.getMenuFromAPI(restaurantId).subscribe(
      (menu) => {
        this.menuItems = menu;
      },
      (error) => {
        console.error('Error fetching menu:', error);
      }
    );
  }
}
