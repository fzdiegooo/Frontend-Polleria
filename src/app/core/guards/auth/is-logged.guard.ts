import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';

export const isLoggedGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isLoggedIn$.pipe(
    map((isLoggedIn) => isLoggedIn || router.createUrlTree(['/login']))
  )
};
