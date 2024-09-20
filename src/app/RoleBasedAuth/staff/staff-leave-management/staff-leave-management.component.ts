import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaffService } from 'src/app/services/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-leave-management',
  templateUrl: './staff-leave-management.component.html',
  styleUrls: ['./staff-leave-management.component.css']
})
export class StaffLeaveManagementComponent {
  showApplyLeaveForm = false;
  leaveForm: FormGroup;
  leaves: any[] = [];
  searchTerm: string = ''; 
  selectedStatus: any = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn: string = '';
  loading = false; 
  today: string | undefined;

  constructor(private fb: FormBuilder, private staffService: StaffService) {
    this.leaveForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
     // Get today's date in the format YYYY-MM-DD
     const todayDate = new Date();
     const year = todayDate.getFullYear();
     const month = String(todayDate.getMonth() + 1).padStart(2, '0'); 
     const day = String(todayDate.getDate()).padStart(2, '0');
     
     this.today = `${year}-${month}-${day}`;

    this.loadLeaves();
  }

  loadLeaves() {
    this.loading = true;
    this.staffService.getLeaves().subscribe(
      data => {
        this.leaves = data;    
        this.sortData(this.sortColumn); 
        this.loading = false;
      },
      error => {
        console.error('Error fetching leaves', error);
        this.loading = false;
      }
    );
  }
  toggleApplyLeaveForm() {
    this.showApplyLeaveForm = !this.showApplyLeaveForm;
  }

  applyLeave() {
    if (this.leaveForm.valid) {
      const newLeave = this.leaveForm.value;
      const UserFullName =localStorage.getItem('fullName');
      const userDepartment =localStorage.getItem('userDepartment');
      const username =localStorage.getItem('username');
      const leaveToPost = { ...newLeave, status: 'Pending' ,UserFullName,userDepartment,username};
      this.staffService.applyLeave(leaveToPost).subscribe(response => {
        this.leaveForm.reset();
        this.loadLeaves();
        this.showApplyLeaveForm = false;
      }, error => {
        console.error('Error posting leave', error);
      });
    }
   
  }

  viewLeave(leave: any) {
    Swal.fire({
      title: `<h1 style="color: #4CAF50;">Leave Details</h1>`,
      html: `
        <div style="text-align: center; font-size: 16px; line-height: 1.8; padding: 0 20px;">
          <p><strong style="color: #333;">From:</strong> ${leave.fromDate}</p>
          <p><strong style="color: #333;">To:</strong> ${leave.toDate}</p>
          <p><strong style="color: #333;">Reason:</strong> ${leave.reason}</p>
          <p><strong style="color: #333;">Status:</strong> ${leave.status}</p>
        </div>
      `,
      confirmButtonText: 'OK',
      confirmButtonColor: '#4CAF50', 
      width: '400px', 
      padding: '20px', 
      background: '#f9f9f9', 
      customClass: {
        popup: 'staff-popup'
      }
    });
  }

  sortData(column: string) {
    this.sortDirection = (this.sortColumn === column && this.sortDirection === 'asc') ? 'desc' : 'asc';
    this.sortColumn = column;

    this.leaves.sort((a, b) => {
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
}
