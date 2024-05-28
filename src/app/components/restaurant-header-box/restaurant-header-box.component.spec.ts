import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantHeaderBoxComponent } from './restaurant-header-box.component';

describe('RestaurantHeaderBoxComponent', () => {
  let component: RestaurantHeaderBoxComponent;
  let fixture: ComponentFixture<RestaurantHeaderBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantHeaderBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantHeaderBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
