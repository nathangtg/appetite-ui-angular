import { Component, OnInit, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NgFor, CommonModule } from '@angular/common';

import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgFor, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {} // private route: ActivatedRoute // private restaurantService: RestaurantService,

  ngOnInit() {}
}
