import { Component, inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { AccountModel } from '../../../models/accounts/account.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AccountService } from '../../../services/account/account.service';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { DialogService } from '../../../services/dialog/dialog.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-transfer-my-accounts-dialog',
  imports: [MatDialogModule, MatButtonModule, MatSelectModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './transfer-my-accounts-dialog.component.html',
  styleUrl: './transfer-my-accounts-dialog.component.css'
})
export class TransferMyAccountsDialogComponent extends
  BaseDialog<TransferMyAccountsDialogComponent, AccountModel> implements OnInit {

  async ngOnInit() {
    await this.getAccounts();
  }

  private formBuilder = inject(FormBuilder);
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);
  private dialogService = inject(DialogService);

  accounts: AccountModel[] = [];

  async getAccounts() {
    this.accounts = [];
    const accounts = await this.accountService.getAll()
    this.accounts = accounts.filter(x => x.id != this.data.id);
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  transferForm: FormGroup = this.formBuilder.group({
    fromAccountCode: [this.data.code, [Validators.required]],
    toAccountCode: ['', [Validators.required]],
    channel: ['Web', [Validators.required]],
    amount: [1, [Validators.required, Validators.min(1)]]
  })

  public get amount() {
    return this.transferForm.get('amount');
  }

  async onSubmit() {
    if (this.transferForm.valid) {
      await this.dialogService.open({
        compononent: ConfirmDialogComponent,
        onAfterClosed: async (value: boolean | undefined) => {
          if (value) {
           await this.transactionService.create({
              amount: this.transferForm.value.amount,
              channel: this.transferForm.value.channel,
              fromAccountCode: this.transferForm.value.fromAccountCode,
              toAccountCode: this.transferForm.value.toAccountCode
            }, () => {
              this.dialogRef.close(true);
            })
          }
        }
      })
    }
  }
}
