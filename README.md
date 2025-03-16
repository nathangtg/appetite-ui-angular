# Appetite UI Angular

A modern and responsive front-end application for food ordering systems, built with Angular. This UI connects to the [Appetite API](https://github.com/nathangtg/appetite-api) backend to provide a complete food ordering platform with both customer and admin experiences.

## Features

- **Responsive Design**: Optimized user experience across mobile, tablet, and desktop devices
- **Customer Portal**: Browse restaurants, view menus, place orders, and track order status
- **Admin Dashboard**: Comprehensive management tools for restaurants, menus, and orders
- **Authentication**: Secure login and registration with role-based access control
- **Order Management**: Complete order lifecycle from creation to fulfillment
- **Restaurant Profiles**: Detailed restaurant information with operating hours and contact details
- **Menu Management**: Tools for creating and organizing food menus with categories
- **Order History**: Track past orders and reorder favorite items
- **Real-time Updates**: Live order status updates using reactive programming principles

## Tech Stack

- **Framework**: Angular 16+
- **State Management**: RxJS for reactive programming
- **Routing**: Angular Router for SPA experience
- **HTTP Communication**: Angular HTTP Client
- **Styling**: SCSS with responsive design principles
- **UI Components**: Custom components with Material Design influences
- **Authentication**: JWT token-based authentication

## Getting Started

### Prerequisites

- Node.js 14+ and npm
- Angular CLI 16+
- Appetite API backend running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nathangtg/appetite-ui-angular.git
   cd appetite-ui-angular
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment:
   Update `src/environments/environment.ts` with your API endpoint:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8000/api'
   };
   ```

4. Run the development server:
   ```bash
   ng serve
   ```

5. Navigate to `http://localhost:4200` in your browser

## Key Components

### Customer Experience

- **Restaurant Browser**: Browse and search restaurants
- **Menu Viewer**: View restaurant menus with categories and item details
- **Cart Management**: Add items to cart, modify quantities, and proceed to checkout
- **Order Placement**: Complete the ordering process with delivery options
- **Order Tracking**: Track order status from placement to delivery
- **User Profile**: Manage personal information and view order history

### Admin Dashboard

- **Restaurant Management**: Create, edit, and manage restaurant profiles
- **Menu Editor**: Build and organize menus with categories and items
- **Order Handling**: Process incoming orders and update order status
- **User Management**: Manage system users and roles
- **Analytics**: View sales data, popular items, and customer trends

## Deployment

Build the application for production:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Related Projects

- [Appetite API](https://github.com/nathangtg/appetite-api) - Laravel backend for the Appetite food ordering platform
