import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable, throwError } from "rxjs";
import { JwtService } from "../services/jwt/jwt.service";
import { Router } from "@angular/router";

export function errorHandlingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const toastrService = inject(ToastrService);
  const jwtService = inject(JwtService);
  const router = inject(Router);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {


    let result: { message: string } | undefined = error.error as { message: string } | undefined;

    if (error.status == 401) {
      jwtService.deleteJwtInStorage();
      router.navigate(['/login'])
      if (!result) {
        result = {
          message: 'Oturum süreniz doldu'
        };
      }
    }

    if (result) {
      toastrService.error(result.message, 'Hata');
    }

    return throwError(() => error);
  }));
}