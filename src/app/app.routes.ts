import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent, pathMatch: 'full' },
  { path: 'auth/register', component: RegisterComponent, pathMatch: 'full' },
];
