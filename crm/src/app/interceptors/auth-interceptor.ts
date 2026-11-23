import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const idToken = auth.idToken;

  if (idToken() == "") {
    return next(req);
  } else {
    const authRequest = req.clone({
      setParams: {
        auth: idToken()
      }
    });
    return next(authRequest);
  }
};
