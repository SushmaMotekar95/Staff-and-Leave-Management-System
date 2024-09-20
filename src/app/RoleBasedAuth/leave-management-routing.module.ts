import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterationComponent } from './Auth/registeration/registeration.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import { authGuard } from '../Auth_Guard/auth.guard';
import { StaffDashboardComponent } from './staff/staff-dashboard/staff-dashboard.component';
import { StaffLeaveManagementComponent } from './staff/staff-leave-management/staff-leave-management.component';
import { HODDashboradComponent } from './HOD/hod-dashborad/hod-dashborad.component';
import { StaffManagementComponent } from './HOD/staff-management/staff-management.component';
import { HodLeaveManagementComponent } from './HOD/hod-leave-management/hod-leave-management.component';

const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterationComponent},
  { path:'dashborad', component:DashboradComponent, canActivate: [authGuard],
    children: [
      { path: 'HOD-dashboard', component: HODDashboradComponent },
      { path: 'staff-management', component: StaffManagementComponent },
      { path: 'leave-management', component: HodLeaveManagementComponent },
      { path: 'staff-dashboard', component: StaffDashboardComponent },
      { path: 'staff-leave-management', component: StaffLeaveManagementComponent },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveManagementRoutingModule { }
