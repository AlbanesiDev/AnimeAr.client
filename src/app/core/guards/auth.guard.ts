import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const currentUser = authService.currentUserSig();
  const router = inject(Router);

  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
