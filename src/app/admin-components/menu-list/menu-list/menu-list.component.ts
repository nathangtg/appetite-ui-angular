import { LoadingComponent } from './../../../components/loading/loading.component';
import { Component, Input } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';
import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, NgIf, LoadingComponent],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css',
})
export class MenuListComponent {
  @Input() menuItems: any[] = [];
  restaurantId: string | null = null;
  editForm: FormGroup | null = null;
  addMenuForm: FormGroup;
  showAddForm: boolean = false;
  selectedFile: File | null = null;

  LoadingMenuComponent: boolean = false;

  constructor(private menuService: MenuService, private fb: FormBuilder) {
    this.addMenuForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.LoadingMenuComponent = true;

    this.restaurantId = this.getRestaurantIdFromUrl();
    if (this.restaurantId !== null) {
      this.fetchMenu();
    } else {
      console.error('Cannot fetch menu: Restaurant ID is null');
    }
  }

  fetchMenu() {
    this.menuService.getMenuFromAPI(this.restaurantId!).subscribe(
      (data) => {
        this.menuItems = data.menus;
        this.LoadingMenuComponent = false;
      },
      (error) => {
        console.error('Failed to fetch menu:', error);
      }
    );
  }

  getRestaurantIdFromUrl(): string | null {
    const url = window.location.href;
    const idMatch = url.match(/\/admin\/dashboard\/(\d+)\/?/);
    if (idMatch && idMatch.length > 1) {
      return idMatch[1];
    } else {
      console.error('Restaurant ID not found in URL.');
      return null;
    }
  }

  initEditForm(menuItem: any) {
    this.editForm = this.fb.group({
      id: [menuItem.id, Validators.required],
      name: [menuItem.name, Validators.required],
      description: [menuItem.description, Validators.required],
      price: [menuItem.price, Validators.required],
      display: [menuItem.display, Validators.required],
    });
  }

  submitEditForm() {
    if (this.editForm!.valid) {
      const editedMenuItem = this.editForm!.value;
      console.log('Edited Menu Item:', editedMenuItem);
      console.log('Restaurant ID:', this.restaurantId);
      this.editForm = null;

      this.menuService
        .modifyMenuItemInAPI(
          this.restaurantId!,
          editedMenuItem.id,
          editedMenuItem
        )
        .subscribe(
          (response) => {
            console.log('API Response:', response);
            this.fetchMenu();
          },
          (error) => {
            console.error('Failed to update menu item:', error);
          }
        );
    }
  }

  cancelEdit() {
    this.editForm = null;
  }

  submitImageUpload(event: any, menuItem: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      this.menuService
        .modifyImageInAPI(this.restaurantId!, menuItem.id, formData)
        .subscribe(
          (response) => {
            console.log('Image upload response:', response);
            this.fetchMenu();
          },
          (error) => {
            console.error('Failed to upload image:', error);
          }
        );
    }
  }

  toggleDisplay(menuItem: any) {
    menuItem.display = menuItem.display === 'yes' ? 'no' : 'yes';
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.addMenuForm.reset();
      this.selectedFile = null;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  deleteMenuItem(menuItem: any) {
    this.menuService
      .deleteMenuItemInAPI(this.restaurantId!, menuItem.id)
      .subscribe(
        (response) => {
          console.log('Deleted menu item:', response);
          this.fetchMenu();
        },
        (error) => {
          console.error('Failed to delete menu item:', error);
        }
      );
  }

  submitAddForm() {
    if (this.addMenuForm.valid && this.restaurantId) {
      const formData = new FormData();
      formData.append('name', this.addMenuForm.get('name')!.value);
      formData.append('category', this.addMenuForm.get('category')!.value);
      formData.append(
        'description',
        this.addMenuForm.get('description')!.value
      );
      formData.append('price', this.addMenuForm.get('price')!.value);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.menuService
        .createMenuItemInAPI(this.restaurantId, formData)
        .subscribe(
          (response) => {
            console.log('Menu item created:', response);
            this.addMenuForm.reset();
            this.selectedFile = null;
            this.showAddForm = false;
            this.fetchMenu();
          },
          (error) => {
            console.error('Error creating menu item:', error);
          }
        );
    }
  }
}
