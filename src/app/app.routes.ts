import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent, pathMatch: 'full' },
];
