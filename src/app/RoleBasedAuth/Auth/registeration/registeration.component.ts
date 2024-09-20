import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent {
  registrationForm: FormGroup;
  roles: string[] = ['HOD', 'Staff'];
  departments: string[] = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry'];
  isHod: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.registrationForm = this.fb.group({
      role: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profileImage: [null],
      department: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const { email, password, name, username, contactNumber, role, department } = this.registrationForm.value;
      this.authService.registerUser(email, password, name, username, contactNumber, role, department)
        .subscribe({
          next: () => {
            this.toastr.success('User registered successfully!', 'Success', {
              timeOut: 3000,
            });
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.toastr.error('Registration failed!', 'Error', {
              timeOut: 3000,
            });
            console.error('Registration failed:', error);
          }
        });
    } else {
      console.error('Form is not valid');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registrationForm.patchValue({
        profileImage: file
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);  
  }
}