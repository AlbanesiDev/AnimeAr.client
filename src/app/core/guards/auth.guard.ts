import { Router, type CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { map } from "rxjs";

import { AuthService } from "../auth/auth.service";

export const authStateObs$ = () => inject(AuthService).authState$;
export const routerInjection = () => inject(Router);

export const authGuard: CanActivateFn = () => {
  const router = routerInjection();

  return authStateObs$().pipe(
    map((user) => {
      if (!user) {
        router.navigate(["auth/login"]);
        return false;
      } else {
        return true;
      }
    }),
  );
};

export const publicGuard: CanActivateFn = () => {
  const router = routerInjection();

  return authStateObs$().pipe(
    map((user) => {
      if (user) {
        router.navigate(["/"]);
        return false;
      } else {
        return true;
      }
    }),
  );
};
