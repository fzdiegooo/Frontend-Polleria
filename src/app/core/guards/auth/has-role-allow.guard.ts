import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map, tap } from 'rxjs';

export const hasRoleAllowGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const rolesPermitidos = route.data?.['roles'];
  return authService.user$.pipe(
    map((user)=> Boolean(user && rolesPermitidos?.includes(user.role))),
    tap((hasRole) => hasRole === false && authService.redirectToLogin())
  );
};
