import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { JwtService } from "../services/jwt/jwt.service";

export function authorizationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const jwtService = inject(JwtService);
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${jwtService.getJwtInStorage()}`),
  });
  return next(newReq);
}