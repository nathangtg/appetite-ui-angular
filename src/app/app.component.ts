import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RestaurantCardComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'appetite-ui-angular';
  description: string =
    'This is a simple Angular application that demonstrates the use of the Appetite UI components.';
}
