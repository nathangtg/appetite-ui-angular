import { Component } from '@angular/core';
import { MenuListComponent } from '../../../admin-components/menu-list/menu-list/menu-list.component';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [MenuListComponent],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css',
})
export class MenuAdminComponent {}
