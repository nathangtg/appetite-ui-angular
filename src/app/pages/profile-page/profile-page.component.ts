import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  profileForm: FormGroup;
  userProfile: any;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private accoutService: AccountService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      preferred_cuisine: [''],
      account_type: [''],
    });
  }

  cuisineOptions = [
    { value: 'malay', label: 'Malay' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'indian', label: 'Indian' },
    { value: 'thai', label: 'Thai' },
    { value: 'western', label: 'Western' },
    { value: 'indonesian', label: 'Indonesian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' },
    { value: 'middle-eastern', label: 'Middle Eastern' },
    { value: 'fusion', label: 'Fusion' },
    { value: 'other', label: 'Other' },
  ];

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.accoutService.getProfile().subscribe(
      (response) => {
        this.userProfile = response;
        this.profileForm.patchValue({
          name: this.userProfile.name,
          email: this.userProfile.email,
          preferred_cuisine: this.userProfile.preferred_cuisine,
          account_type: this.userProfile.account_type,
        });
      },
      (error) => {
        console.error('Profile load failed', error);
      }
    );
  }

  getCuisineLabel(value: string): string {
    const cuisine = this.cuisineOptions.find((c) => c.value === value);
    return cuisine ? cuisine.label : value;
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  onSubmit(): void {
    console.log('Profile form submitted', this.profileForm.value);

    if (this.profileForm.valid) {
      console.log('Profile form submitted', this.profileForm.value);
      const profileId = this.userProfile.id;
      this.updateProfile(this.profileForm.value, profileId);
    }
  }

  updateProfile(profileData: any, profileId: string): void {
    this.accoutService.updateProfile(profileData, profileId).subscribe(
      (response) => {
        console.log('Profile updated', response);
        this.isEditing = false;
        this.loadUserProfile();
      },
      (error) => {
        console.error('Profile update failed', error);
      }
    );
  }
}
