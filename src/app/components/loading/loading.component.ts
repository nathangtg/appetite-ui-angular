import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinner, MatProgressSpinnerModule, NgIf],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  // Add Angular Material Progress Spinner Module
  constructor() {}

  @Input() isLoading: boolean = false;
}
