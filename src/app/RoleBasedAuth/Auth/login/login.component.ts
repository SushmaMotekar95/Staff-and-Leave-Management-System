import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      this.authService.loginUser(username, password).subscribe({
        next: (data) => { 
          if (data && data.token) {
            this.toastr.success('User Login successfully!', 'Success', {
              timeOut: 3000,
            });
            this.router.navigate(['/dashborad']);


  
            const { token, role, name, department } = data;
  
            // Store the token and role
            localStorage.setItem('userToken', token);
            localStorage.setItem('userRole', role);
            localStorage.setItem('fullName', name);
            localStorage.setItem('userDepartment', department);
            localStorage.setItem('username', username);
  
            // Redirect to the dashboard
            // this.router.navigate(['/dashboard']);
          } else {
            this.toastr.error('Login failed! Invalid username or password.', 'Error', {
              timeOut: 3000,
            });
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.toastr.error('An error occurred during login. Please try again later.', 'Error', {
            timeOut: 3000,
          });
        }
      });
    } else {
      console.error('Form is not valid');
    }
  }
  
  
  

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }

}
