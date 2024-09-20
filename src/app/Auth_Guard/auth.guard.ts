import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('userToken');
  const role = localStorage.getItem('userRole');

  if (token) {
    // Allow access for HOD and Staff roles
    if (role === 'HOD' || role === 'Staff') {
      return true;  // Allow access
    } else {
      router.navigate(['/unauthorized']); // Redirect to unauthorized page
      return false; // Deny access
    }
  } else {
    router.navigate(['/login']); // Redirect to login page
    return false; // Deny access
  }
};
