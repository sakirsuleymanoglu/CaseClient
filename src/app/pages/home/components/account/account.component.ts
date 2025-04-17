import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { AccountModel } from '../../../../models/accounts/account.model';
import { MatCardModule } from '@angular/material/card';
import { TransactionsComponent } from "../transactions/transactions.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../../../services/dialog/dialog.service';
import { TransferMyAccountsDialogComponent } from '../../../../components/dialogs/transfer-my-accounts-dialog/transfer-my-accounts-dialog.component';
import { TransferOtherAccountsDialogComponent } from '../../../../components/dialogs/transfer-other-accounts-dialog/transfer-other-accounts-dialog.component';

@Component({
  selector: 'app-account',
  imports: [MatCardModule, TransactionsComponent, MatMenuModule, MatButtonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  @Input() account!: AccountModel;

  private dialogService = inject(DialogService);

  @Output() onTransfer = new EventEmitter();

  transferMyAccounts(account: AccountModel) {
    this.dialogService.open({
      compononent: TransferMyAccountsDialogComponent,
      data: account,
      width:"600px",
      height:"500px",
      onAfterClosed:(value: boolean | undefined) => {
        if(value){
          this.onTransfer.emit();
        }
      }
    });
  }

  transferOtherAccounts(account: AccountModel) {
    this.dialogService.open({
      compononent: TransferOtherAccountsDialogComponent,
      data: account,
      width:"600px",
      height:"500px",
      onAfterClosed:(value: boolean | undefined) => {
        if(value){
          this.onTransfer.emit();
        }
      }
    });
  }
}
