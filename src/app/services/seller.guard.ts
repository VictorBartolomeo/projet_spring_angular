import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';

export const sellerGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)

  if (auth.role == "ROLE_SELLER" || auth.role == "ROLE_CHIEF") {
    return true
  }

  const router: Router = inject(Router)
  return router.parseUrl('/login')
};
