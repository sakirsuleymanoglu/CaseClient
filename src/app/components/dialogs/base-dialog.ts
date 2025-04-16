import { inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<TComponent, TData> {

    constructor() { }

    readonly dialogRef = inject(MatDialogRef<TComponent>);
    readonly data = inject<TData>(MAT_DIALOG_DATA);
}