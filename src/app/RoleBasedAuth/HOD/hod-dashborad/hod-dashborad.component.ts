import { Component } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-hod-dashborad',
  templateUrl: './hod-dashborad.component.html',
  styleUrls: ['./hod-dashborad.component.css']
})
export class HODDashboradComponent {
  totalStaff: number = 0;
  loading = false; 

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.loadStaffCount()
  }


  loadStaffCount() {
    this.loading = true; 
    this.staffService.getStaffCount().subscribe(count => {
      this.totalStaff = count; 
      this.loading = false; 
    }, error => {
      console.error('Error fetching staff count', error);
      this.loading = false; 
    });
  }
}