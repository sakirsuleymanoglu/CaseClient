import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt/jwt.service';

export const alreadyAuthGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  const result = jwtService.checkIfUseableJwtInStorage();

  if(result){
    router.navigate(['/home']);
    return false;
  }
  return true;
};
