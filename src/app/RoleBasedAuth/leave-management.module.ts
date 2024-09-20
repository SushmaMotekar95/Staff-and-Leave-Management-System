import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveManagementRoutingModule } from './leave-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterationComponent } from './Auth/registeration/registeration.component';
import { LoginComponent } from './Auth/login/login.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import { MaterialModule } from '../shareModule/material.module';
import { StaffDashboardComponent } from './staff/staff-dashboard/staff-dashboard.component';
import { StaffLeaveManagementComponent } from './staff/staff-leave-management/staff-leave-management.component';
import { HODDashboradComponent } from './HOD/hod-dashborad/hod-dashborad.component';
import { StaffManagementComponent } from './HOD/staff-management/staff-management.component';
import { HodLeaveManagementComponent } from './HOD/hod-leave-management/hod-leave-management.component';
import { HttpClientModule } from '@angular/common/http';
import { LeaveDialogComponent } from './staff/dialog/leave-dialog/leave-dialog.component';
import { StaffFormDialogComponent } from './HOD/dialog/staff-form-dialog/staff-form-dialog.component';
import { SearchPipe } from '../pipe/search.pipe';
import { SearchHodLeavePipe } from '../pipe/search-hod-leave.pipe';
import { SearchSaffLeavePipe } from '../pipe/search-saff-leave.pipe';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    RegisterationComponent,
    LoginComponent,
    DashboradComponent,
    StaffDashboardComponent,
    StaffLeaveManagementComponent,
    HODDashboradComponent,
    StaffManagementComponent,
    HodLeaveManagementComponent,
    LeaveDialogComponent,
    StaffFormDialogComponent, 
    SearchPipe,
    SearchHodLeavePipe, 
    SearchSaffLeavePipe,
  ],
  imports: [
    CommonModule,
    LeaveManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
   

  ],
  // exports:[
  //   RegisterationComponent,
  //   LoginComponent
  // ]
})
export class LeaveManagementModule { }
