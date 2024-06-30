import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

interface Order {
  id: string;
  restaurant_id: string;
  status: string;
  total: number;
  email: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  order_type: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: Order[] = []; // Define as Order[]
  filteredOrders: Order[] = [];
  currentFilter = 'all'; // Default filter

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getOrdersByUserAPI().subscribe(
      (orders: Order[]) => {
        // Specify type as Order[]
        this.orders = orders;
        console.log('Fetched Orders:', this.orders);
        this.applyFilter(this.currentFilter); // Apply default filter
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  }

  setFilter(status: string) {
    this.currentFilter = status;
    this.applyFilter(status);
  }

  applyFilter(status: string) {
    if (status === 'all') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(
        (order) => order.status === status
      );
    }
  }

  cancelOrder(restaurantId: string, orderId: string) {
    const orderData = { status: 'cancelled' }; // Define data to update order status
    this.orderService.updateOrder(restaurantId, orderId, orderData).subscribe(
      (response) => {
        console.log('Order Cancelled:', response);
        // Optionally, update the status locally after successful cancellation
        const cancelledOrderIndex = this.orders.findIndex(
          (order) => order.id === orderId
        );
        if (cancelledOrderIndex !== -1) {
          this.orders[cancelledOrderIndex].status = 'cancelled';
          this.applyFilter(this.currentFilter); // Reapply filter after updating status
        }
      },
      (error) => {
        console.error('Error cancelling order:', error);
      }
    );
  }
}
