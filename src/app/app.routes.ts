import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { MenuRestaurantComponent } from './pages/menu-restaurant/menu-restaurant.component';
import { DashboardComponent } from './admin-pages/dashboard/dashboard.component';
import { UserLayoutComponent } from '../app/pages/layout/layout.component';
import { DashboardIdComponent } from './admin-pages/dashboard-id/dashboard-id.component';
import { AdminLayoutComponent } from './admin-pages/layouts/layout/layout.component';
import { CreateRestaurantComponent } from './admin-pages/create-restaurant/create-restaurant.component';
import { DashboardIdLayoutComponent } from './admin-pages/layouts/dashboard-id-layout/dashboard-id-layout.component';
import { OrderAdminComponent } from './admin-pages/order-admin/order-admin.component';
import { MenuAdminComponent } from './admin-pages/menu-admin/menu-admin/menu-admin.component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/register', component: RegisterComponent },
      { path: 'restaurants', component: RestaurantsComponent },
    ],
  },

  // ! Admin Routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'create-restaurant',
        component: CreateRestaurantComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'admin/dashboard/:id',
    component: DashboardIdLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardIdComponent,
      },
      {
        path: 'orders',
        component: OrderAdminComponent,
      },
      {
        path: 'menu',
        component: MenuAdminComponent,
      },
    ],
  },
  {
    path: 'restaurants/:id',
    component: MenuRestaurantComponent,
  },
];
