import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent {
  isSidenavClosed = false;
  isHOD = false;
  userRole:any;

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit() {
   this.userRole = localStorage.getItem('userRole');
    this.isHOD = this.userRole === 'HOD';
  }
  toggleSidenav() {
    this.isSidenavClosed = !this.isSidenavClosed;
  }


  logout() {
    this.authService.logoutUser().subscribe({
      next: () => {
        // Handle any additional actions if needed
      },
      error: (error) => {
        console.error('Error during logout:', error);
      }
    });
    //  localStorage.removeItem('userToken');
    //  localStorage.removeItem('userRole');
    localStorage.clear();
 
     // Redirect to login page
     this.router.navigate(['/login']);
  }
  

}
