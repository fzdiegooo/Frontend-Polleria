import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map, tap } from 'rxjs';

export const hasRoleGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const rolesPermitidos = route.data?.['roles'];
  return authService.user$.pipe(
    map((user)=> Boolean(user && rolesPermitidos?.includes(user.role))),
    tap((hasRole) => hasRole === false && authService.redirectToLogin())
  );
};
