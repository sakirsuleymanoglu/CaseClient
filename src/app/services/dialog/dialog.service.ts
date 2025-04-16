import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  open<T>(component: any, onAfterClosed?: (value: T | undefined) => void) {
    lastValueFrom(this.dialog.open<any, any, T>(component, {
      
    }).afterClosed()).then(onAfterClosed).catch(_ => {
      if (onAfterClosed) {
        onAfterClosed(undefined);
      }
    });
  }
}
