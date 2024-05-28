import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRestaurantBreadcrumbComponent } from './home-restaurant-breadcrumb.component';

describe('HomeRestaurantBreadcrumbComponent', () => {
  let component: HomeRestaurantBreadcrumbComponent;
  let fixture: ComponentFixture<HomeRestaurantBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeRestaurantBreadcrumbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeRestaurantBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
