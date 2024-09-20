import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodLeaveManagementComponent } from './hod-leave-management.component';

describe('HodLeaveManagementComponent', () => {
  let component: HodLeaveManagementComponent;
  let fixture: ComponentFixture<HodLeaveManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HodLeaveManagementComponent]
    });
    fixture = TestBed.createComponent(HodLeaveManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
