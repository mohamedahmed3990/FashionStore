//Role Guards are added by me totally

import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const RoleGuard = () => {
  const router = inject(Router);
  const role = localStorage.getItem('userRole');

  if (role === 'Admin') {
    return true;
  } else {
    router.navigate(['/home']); // Redirect non-admins
    return false;
  }
};

