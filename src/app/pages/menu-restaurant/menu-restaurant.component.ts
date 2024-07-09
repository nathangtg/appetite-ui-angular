import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';
import { RestaurantHeaderBoxComponent } from '../../components/restaurant-header-box/restaurant-header-box.component';
import { HomeRestaurantBreadcrumbComponent } from '../../components/home-restaurant-breadcrumb/home-restaurant-breadcrumb.component';
import { MenuSectionComponent } from '../../components/menu-section/menu-section.component';
import { CartSectionComponent } from '../../components/cart-section/cart-section.component';
import { CartButtonComponent } from '../../components/cart-button/cart-button.component';
import { OrderButtonComponent } from '../../components/order-button/order-button.component';
import { ToastComponent } from '../../components/toast/toast.component';
import { EmailModalComponent } from '../../components/email-modal/email-modal.component';
import { FormsModule } from '@angular/forms';
import { MenuFilterComponent } from '../../components/menu-filter/menu-filter.component';

@Component({
  selector: 'app-menu-restaurant',
  standalone: true,
  imports: [
    FormsModule,
    MenuCardComponent,
    RestaurantHeaderBoxComponent,
    HomeRestaurantBreadcrumbComponent,
    MenuSectionComponent,
    CartSectionComponent,
    CartButtonComponent,
    OrderButtonComponent,
    ToastComponent,
    EmailModalComponent,
    MenuFilterComponent,
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
  restaurantRating: number | null = null;

  // Toast properties
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'warning' | 'info' = 'info';

  // Menu properties
  menuItems: any[] = [];
  itemsWithQuantity: any[] = [];
  filteredMenuItems: any[] = [];

  // Filter properties
  selectedCategory: string | null = null;
  searchQuery: string = '';

  // Modal properties
  showModal: boolean = false;

  // Email properties
  email: string = '';
  orderType: 'dine-in' | 'takeaway' = 'takeaway';
  MaxTableNumber: number = 0;
  tableNumber: number = 0;
  paymentMethod: 'cash' | 'card' = 'cash';

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchMenuItems();
    this.fetchRestaurantInformation();

    // Initialize filtered items with all menu items
    this.filteredMenuItems = this.menuItems;
  }

  filterMenuItemsBySearch() {
    if (!this.searchQuery.trim()) {
      this.filteredMenuItems = this.menuItems; // Reset to all items if search query is empty
    } else {
      const query = this.searchQuery.trim().toLowerCase();
      this.filteredMenuItems = this.menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }
  }

  fetchMenuItems() {
    if (this.restaurantId) {
      this.menuService.getMenuFromClientAPI(this.restaurantId).subscribe(
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

  fetchRestaurantInformation() {
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
          this.MaxTableNumber = response.number_of_tables;
          this.restaurantRating = response.average_rating;
        },
        (error) => {
          console.error('Error fetching restaurant information:', error);
        }
      );
    } else {
      console.error('Restaurant ID not found in route');
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

  applyCategoryFilter(category: string | null) {
    this.selectedCategory = category;
    this.filteredMenuItems = this.filterMenuItemsByCategory(category);
  }

  private filterMenuItemsByCategory(category: string | null): any[] {
    if (!category) {
      return this.menuItems; // Return all items if no category selected
    }
    return this.menuItems.filter((item) => item.category === category);
  }

  getOrderedItems(): {
    menu_id: number;
    quantity: number;
    price: number;
    note: string;
  }[] {
    const orderedItems = this.menuItems.filter((item) => item.quantity > 0);
    this.showModal = true;
    return orderedItems.map((item) => ({
      menu_id: item.id,
      quantity: item.quantity,
      price: item.price,
      note: item.note,
    }));
  }

  handleModalClose() {
    this.showModal = false;
  }

  hasItemsInCart(): boolean {
    return this.menuItems.some((item) => item.quantity > 0);
  }

  showToastMessage(
    type: 'success' | 'error' | 'warning' | 'info',
    message: string
  ) {
    this.toastType = type;
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  handlePlaceOrder(
    orderItems: {
      menu_id: number;
      quantity: number;
      price: number;
      note: string;
    }[]
  ) {
    if (this.tableNumber <= 0 || this.tableNumber > this.MaxTableNumber) {
      console.error('Invalid table number:', this.tableNumber);
      this.showToastMessage('error', 'Invalid table number');
      return;
    }

    if (!this.restaurantId) {
      console.error('Restaurant ID is null');
      this.showToastMessage(
        'error',
        'Error placing order: Restaurant ID is missing'
      );
      return;
    }

    const orderDetails = orderItems.map((item) => ({
      menu_id: item.menu_id,
      quantity: item.quantity,
      price: item.price,
      note: item.note,
    }));

    this.orderService
      .createOrderAPI(
        this.email,
        'pending',
        this.orderType,
        this.tableNumber,
        this.paymentMethod,
        'pending',
        this.restaurantId,
        orderDetails
      )
      .subscribe(
        (response) => {
          console.log('Order created:', response);
          this.showToastMessage('success', 'Order placed successfully');
          this.showModal = false;
        },
        (error) => {
          console.error('Error placing order:', error);
          this.showToastMessage('error', 'Error placing order');
        }
      );
  }

  handleOrderDetailsSubmit(details: any) {
    this.email = details.email;
    this.orderType = details.orderType;
    this.tableNumber = details.tableNumber;
    this.paymentMethod = details.paymentMethod;

    const orderedItems = this.getOrderedItems();
    this.handlePlaceOrder(orderedItems);
  }
}
