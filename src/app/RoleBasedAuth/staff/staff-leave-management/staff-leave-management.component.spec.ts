import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLeaveManagementComponent } from './staff-leave-management.component';

describe('StaffLeaveManagementComponent', () => {
  let component: StaffLeaveManagementComponent;
  let fixture: ComponentFixture<StaffLeaveManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffLeaveManagementComponent]
    });
    fixture = TestBed.createComponent(StaffLeaveManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
