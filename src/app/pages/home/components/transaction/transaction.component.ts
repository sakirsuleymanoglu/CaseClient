import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TransactionModel } from '../../../../models/transactions/transaction.model';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { DialogService } from '../../../../services/dialog/dialog.service';
import { TransactionDetailDialogComponent } from '../../../../components/dialogs/transaction-detail-dialog/transaction-detail-dialog.component';

@Component({
  selector: 'app-transaction',
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent  {
  @Input() transaction! : TransactionModel;

  private dialogService = inject(DialogService);

  openDetailDialog(transaction: TransactionModel){
    this.dialogService.open({
      compononent: TransactionDetailDialogComponent,
      data:transaction,
    })
  }
}
