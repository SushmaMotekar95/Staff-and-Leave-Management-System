import { Component } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent {
  totalLeaves = 0;
  approvedLeaves = 0;
  rejectedLeaves = 0;
  loading = false; 

  constructor( private staffService:StaffService) {}

  ngOnInit(): void {
    this.loadLeaveSummary();
  }

  loadLeaveSummary() {
    this.loading = true; 
    this.staffService.getLeaves().subscribe(
      leaves => {
        this.calculateLeaveSummary(leaves);
        this.loading = false; 
      },
      error => {
        console.error('Error fetching leaves', error);
        this.loading = false; 
      }
    );
  }

  calculateLeaveSummary(leaves: any[]) {
    let totalLeaves = 0;
    let approvedLeaves = 0;
    let rejectedLeaves = 0;

    leaves.forEach(leave => {
      totalLeaves++;
      if (leave.status === 'Approved') {
        approvedLeaves++;
      } else if (leave.status === 'Rejected') {
        rejectedLeaves++;
      }
    });

    this.totalLeaves = totalLeaves;
    this.approvedLeaves = approvedLeaves;
    this.rejectedLeaves = rejectedLeaves;
  }
}
