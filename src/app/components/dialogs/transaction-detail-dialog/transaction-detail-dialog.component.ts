import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TransactionModel } from '../../../models/transactions/transaction.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BaseDialog } from '../base-dialog';

@Component({
  selector: 'app-transaction-detail-dialog',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './transaction-detail-dialog.component.html',
  styleUrl: './transaction-detail-dialog.component.css'
})
export class TransactionDetailDialogComponent
  extends BaseDialog<TransactionDetailDialogComponent, TransactionModel> {

  onClose(): void {
    this.dialogRef.close();
  }
}
