import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { MenuRestaurantComponent } from './pages/menu-restaurant/menu-restaurant.component';
import { DashboardComponent } from './admin-pages/dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-pages/layout/layout.component';
import { UserLayoutComponent } from '../app/pages/layout/layout.component';
import { DashboardIdComponent } from './admin-pages/dashboard-id/dashboard-id.component';

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
        path: 'dashboard',
        component: DashboardComponent,
      },
      { path: 'dashboard/:id', component: DashboardIdComponent },
    ],
  },
  {
    path: 'restaurants/:id',
    component: MenuRestaurantComponent,
  },
];
