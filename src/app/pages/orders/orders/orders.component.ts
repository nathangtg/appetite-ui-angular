import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RatingModalComponent } from '../../../components/rating-modal/rating-modal.component';

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
  is_rated: boolean;
  payment_method: string;
  payment_status: string;
  created_at: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RatingModalComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: Order[] = []; // Define as Order[]
  filteredOrders: Order[] = [];
  currentFilter = 'all'; // Default filter
  selectedOrder: Order | null = null; // Track selected order for rating modal
  userId: string = ''; // Define user ID

  showRatingModal = false; // Flag to control modal visibility

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
          this.applyFilter(this.currentFilter);
        }
      },
      (error) => {
        console.error('Error cancelling order:', error);
      }
    );
  }

  openRatingModal(order: Order) {
    console.log(
      'Opening rating modal for order:',
      order.id,
      order.restaurant_id
    );
    this.selectedOrder = order;
    this.showRatingModal = true;
  }

  closeRatingModal() {
    this.showRatingModal = false;
    this.selectedOrder = null;
  }

  submitRating(rating: number, comment: string) {
    if (!this.selectedOrder) {
      console.error('No order selected for rating.');
      return;
    }

    const { id: orderId, restaurant_id: restaurantId } = this.selectedOrder;

    console.log('Submitting rating:', orderId, restaurantId, rating, comment);

    this.orderService
      .giveRating(restaurantId, orderId, rating, comment)
      .subscribe(
        (response) => {
          console.log('Rating submitted:', response);
          const ratedOrderIndex = this.orders.findIndex(
            (order) => order.id === orderId
          );
          if (ratedOrderIndex !== -1) {
            this.orders[ratedOrderIndex].is_rated = true;
            this.applyFilter(this.currentFilter);
          }
          this.showRatingModal = false;
          this.selectedOrder = null;
        },
        (error) => {
          console.error('Error submitting rating:', error);
        }
      );
  }
}
