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

  return next(req).pipe(catchError((httpErrorResponse: HttpErrorResponse) => {

    if (httpErrorResponse.status == 401) {
      jwtService.deleteJwtInStorage();
      router.navigate(['/login'])
      return throwError(() => httpErrorResponse);
    }

    let error: { message: string } | undefined = httpErrorResponse.error as { message: string } | undefined;

    if (httpErrorResponse.status == 0) {
      error = {
        message: 'Beklenmeyen bir hata meydana geldi'
      };
    }

    if (error) {
      toastrService.error(error.message, 'Hata');
    }

    return throwError(() => httpErrorResponse);
  }));
}