import { inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<TComponent, TData> {

    constructor() { }

    protected readonly dialogRef = inject(MatDialogRef<TComponent>);
    protected readonly data = inject<TData>(MAT_DIALOG_DATA);
}