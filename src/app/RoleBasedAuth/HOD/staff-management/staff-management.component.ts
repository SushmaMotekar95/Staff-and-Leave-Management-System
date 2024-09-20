import { Component } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';
import Swal from 'sweetalert2';
import { StaffFormDialogComponent } from '../dialog/staff-form-dialog/staff-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent {
  staffList: any[] = [];  
  page: number = 1;       
  pageSize: number = 10;   
  totalStaff: number = 0;  
  searchTerm: string = ''; 
  loading = false;
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn: string = '';


  constructor(private staffService: StaffService,public dialog: MatDialog,private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getStaffList();  
  }

  getStaffList(): void {
    this.loading = true;
    this.staffService.getStaffList(this.page, this.pageSize).subscribe((data: any) => {
      this.loading = false;
     
      this.staffList = data.staff;    
      this.totalStaff = data.total;   
      this.sortData(this.sortColumn); 
    }, error => {
      console.error('Error fetching staffList', error);
      this.loading = false;
    });
  }

  sortData(column: string): void {
    this.sortDirection = (this.sortColumn === column && this.sortDirection === 'asc') ? 'desc' : 'asc';
    this.sortColumn = column;

    this.staffList.sort((a, b) => {
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

  viewStaff(staff: any): void {
    Swal.fire({
      title: `<h1 style="color: #4CAF50;">Staff Details</h1>`,
      html: `
        <div style="text-align: left; font-size: 16px; line-height: 1.8; padding: 0 10px;">
          <p><strong style="color: #333;">Full Name:</strong> ${staff.name}</p>
          <p><strong style="color: #333;">Username:</strong> ${staff.username}</p>
          <p><strong style="color: #333;">Email:</strong> ${staff.email}</p>
          <p><strong style="color: #333;">Contact Number:</strong> ${staff.contactNumber}</p>
          <p><strong style="color: #333;">Department:</strong> ${staff.department}</p>
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
  
  deleteStaff(staffId: string): void {
    if (confirm('Are you sure you want to delete this staff member?')) {
      this.staffService.deleteStaff(staffId).subscribe(() => {
        this.getStaffList();  
      }, error => {
        console.error('Error deleting staff member', error);
      });
    }
  }
  
  addStaff(): void {
    const dialogRef = this.dialog.open(StaffFormDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const role = 'Staff';
        const { email, password, name, username, contactNumber, department } = result;
    
        this.authService.registerUser(email, password, name, username, contactNumber, role, department)
          .subscribe({
            next: () => {
            },
            error: (error) => {
              console.error('Registration failed:', error);
            }
          });
      } else {
        console.error('No staff data received');
      }
    });
  }

  // Pagination controls
  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getStaffList();  // Fetch the previous page
    }
  }

  nextPage(): void {
    if (this.page * this.pageSize < this.totalStaff) {
      this.page++;
      this.getStaffList();  // Fetch the next page
    }
  }
}
