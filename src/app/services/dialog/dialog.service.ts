import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  open(parameters:Partial<DialogParameters>) {
    lastValueFrom(this.dialog.open(parameters.compononent, {
      data: parameters.data
    }).afterClosed()).then(parameters.onAfterClosed).catch(_ => {
      if (parameters.onAfterClosed) {
        parameters.onAfterClosed(undefined);
      }
    });
  }
}

export class DialogParameters {
  compononent: any;
  data?: any;
  onAfterClosed?: (value: any) => void
}
