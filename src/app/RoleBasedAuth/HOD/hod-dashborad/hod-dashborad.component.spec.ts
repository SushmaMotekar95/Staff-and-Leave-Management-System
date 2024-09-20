import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HODDashboradComponent } from './hod-dashborad.component';

describe('HODDashboradComponent', () => {
  let component: HODDashboradComponent;
  let fixture: ComponentFixture<HODDashboradComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HODDashboradComponent]
    });
    fixture = TestBed.createComponent(HODDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
