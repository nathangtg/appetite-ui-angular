import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIdLayoutComponent } from './dashboard-id-layout.component';

describe('DashboardIdLayoutComponent', () => {
  let component: DashboardIdLayoutComponent;
  let fixture: ComponentFixture<DashboardIdLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardIdLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardIdLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
