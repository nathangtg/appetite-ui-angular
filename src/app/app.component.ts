import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MenuService } from './services/menu/menu.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RestaurantCardComponent,
    HeaderComponent,
    MenuCardComponent,
    NgFor,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title: string = 'appetite-ui-angular';
  description: string =
    'This is a simple Angular application that demonstrates the use of the Appetite UI components.';
  restaurant = {
    name: 'The Golden Apple',
    description:
      'The Golden Apple is a family-owned restaurant that serves delicious food in a warm and inviting atmosphere.',
    cuisine: 'American',
    preparationTime: '30',
    priceRange: '$$',
    className: 'restaurant-card',
  };

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}
}
