import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable, throwError } from "rxjs";

export function errorHandlingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const toastrService = inject(ToastrService);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    const result: { message: string } | undefined = error.error as { message: string } | undefined;

    if (result) {
      toastrService.error(result.message, "Hata");
    }

    return throwError(() => error);
  }));
}