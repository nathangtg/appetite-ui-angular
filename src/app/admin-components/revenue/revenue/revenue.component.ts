import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { OrderService } from '../../../services/order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.css',
})
export class RevenueComponent implements OnInit {
  totalOrders: number = 0;
  totalRevenue: number = 0;
  pendingOrders: number = 0;
  completedOrders: number = 0;
  restaurantId: string | 'notFound' = 'notFound';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.restaurantId = this.getRestaurantIdFromUrl();

    console.log(this.restaurantId);

    this.orderService
      .getOrdersByRestaurantAPI(this.restaurantId)
      .subscribe((data) => {
        this.totalOrders = data.length;
        this.totalRevenue = data.reduce(
          (acc, order) => acc + parseFloat(order.total),
          0
        );
        this.pendingOrders = data.filter(
          (order) => order.status === 'pending'
        ).length;
        this.completedOrders = data.filter(
          (order) => order.status === 'completed'
        ).length;
      });
  }

  getRestaurantIdFromUrl(): string | 'notFound' {
    const url = window.location.href;
    const idMatch = url.match(/\/admin\/dashboard\/(\d+)\/?/);
    if (idMatch && idMatch.length > 1) {
      return idMatch[1]; // Assuming the ID is captured in the first capture group
    } else {
      console.error('Restaurant ID not found in URL.');
      return 'notFound';
    }
  }
}
