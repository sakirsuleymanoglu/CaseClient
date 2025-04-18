import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, EMPTY, Observable } from "rxjs";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

export function errorHandlingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const toastrService = inject(ToastrService);
  const router = inject(Router);
  const dialogRef = inject(MatDialog);

  return next(req).pipe(catchError((httpErrorResponse: HttpErrorResponse) => {
    let error: { message: string } | undefined = httpErrorResponse.error as { message: string } | undefined;

    if (httpErrorResponse.status == 0) {
      error = {
        message: 'Beklenmeyen bir hata meydana geldi'
      };
    }

    if (httpErrorResponse.status == 401) {
      error = {
        message: 'Oturum süreniz sonlandı'
      }
      dialogRef.closeAll();
      router.navigate(['/login'])
    }

    if (error) {
      toastrService.error(error.message, 'Hata');
    }

    return EMPTY;
  }));
}