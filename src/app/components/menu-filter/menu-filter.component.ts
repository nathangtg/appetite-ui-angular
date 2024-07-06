import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-menu-filter',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './menu-filter.component.html',
  styleUrl: './menu-filter.component.css',
})
export class MenuFilterComponent {
  @Output() filterChanged = new EventEmitter<string>();

  selectedCategory: string | null = null;

  // Define the categories with display names, values, and Tailwind classes
  categories: { displayName: string; value: string; iconClass: string }[] = [
    {
      displayName: 'Main Course',
      value: 'main_course',
      iconClass: 'border-blue-300 text-blue-800',
    },
    {
      displayName: 'Side Dish',
      value: 'side_dish',
      iconClass: 'border-green-300 text-green-800',
    },
    {
      displayName: 'Appetizer',
      value: 'appetizer',
      iconClass: 'border-yellow-300 text-yellow-800',
    },
    {
      displayName: 'Salad',
      value: 'salad',
      iconClass: 'border-red-300 text-red-800',
    },
    {
      displayName: 'Dessert',
      value: 'dessert',
      iconClass: 'border-purple-300 text-purple-800',
    },
    {
      displayName: 'Drink',
      value: 'drink',
      iconClass: 'border-indigo-300 text-indigo-800',
    },
    {
      displayName: 'Beverage',
      value: 'beverage',
      iconClass: 'border-pink-300 text-pink-800',
    },
    {
      displayName: 'Snack',
      value: 'snack',
      iconClass: 'border-gray-300 text-gray-800',
    },
    {
      displayName: 'Breakfast',
      value: 'breakfast',
      iconClass: 'border-orange-300 text-orange-800',
    },
  ];

  // Emit filter changes
  applyFilter(category: string | null) {
    this.selectedCategory = category;
    this.filterChanged.emit(this.selectedCategory!);
  }
}
