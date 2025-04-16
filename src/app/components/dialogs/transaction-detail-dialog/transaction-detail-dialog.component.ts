import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TransactionModel } from '../../../models/transactions/transaction.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-detail-dialog',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './transaction-detail-dialog.component.html',
  styleUrl: './transaction-detail-dialog.component.css'
})
export class TransactionDetailDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<TransactionModel>(MAT_DIALOG_DATA);

  onClose(): void {
    this.dialogRef.close();
  }
}
