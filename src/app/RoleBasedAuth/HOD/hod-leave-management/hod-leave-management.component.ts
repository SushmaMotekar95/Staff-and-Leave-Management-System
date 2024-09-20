import { Component } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hod-leave-management',
  templateUrl: './hod-leave-management.component.html',
  styleUrls: ['./hod-leave-management.component.css']
})
export class HodLeaveManagementComponent {
  leavesList: any[] = [];
  filteredLeavesList: any[] = []; 
  selectedStatus: string = '';
  searchTerm: string = '';
  loading = false;
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn: string = '';

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.getLeavesList();
  }


  getLeavesList(): void {
    this.loading = true;
    const department = localStorage.getItem('userDepartment');
    this.leaveService.getLeaves().subscribe(data => {
      this.leavesList = Object.entries(data || {}).map(([key, value]) => ({
        id: key,    
        ...value    
      }));
  
      if (department) {
        this.leavesList = this.leavesList.filter(leave => leave.userDepartment === department);
      }
      
      this.loading = false;
      this.sortData(this.sortColumn);  
    }, error => {
      console.error('Error fetching leaves', error);
      this.loading = false;
    });
  }
  sortData(column: string): void {
    this.sortDirection = (this.sortColumn === column && this.sortDirection === 'asc') ? 'desc' : 'asc';
    this.sortColumn = column;

    this.leavesList.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  viewLeave(leave: any) {
    Swal.fire({
      title: '<h1 style="color: #4CAF50;">Leave Details </h1>',
      html: `
        <strong>Staff Name:</strong> ${leave.UserFullName}<br>
        <strong>Reason:</strong> ${leave.reason}<br>
        <strong>Status:</strong> ${leave.status}
      `,
      confirmButtonText: 'OK',
      confirmButtonColor: '#4CAF50'
    });
  }

  approveLeave(leaveId: string): void {
    this.leaveService.approveLeave(leaveId).subscribe(() => {
      this.getLeavesList();  
    }, error => {
      console.error('Error approving leave', error);
    });
    this.getLeavesList();
  }

  rejectLeave(leaveId: string): void {
    this.leaveService.rejectLeave(leaveId).subscribe(() => {
      this.getLeavesList();  
    }, error => {
      console.error('Error rejecting leave', error);
    });
    this.getLeavesList();
  }
}
