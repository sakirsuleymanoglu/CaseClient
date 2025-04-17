import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  async open(parameters: Partial<DialogParameters>) {
    await lastValueFrom(this.dialog.open(parameters.compononent, {
      data: parameters.data,
      height: parameters.height,
      width: parameters.width,
      maxHeight: parameters.maxHeight,
      maxWidth: parameters.maxWidth
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
  width?: string | undefined;
  height?: string | undefined;
  maxWidth?: string | undefined;
  maxHeight?: string | undefined;
  onAfterClosed?: (value: any) => void
}
