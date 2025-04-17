import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AccountModel } from '../../../models/accounts/account.model';
import { BaseDialog } from '../base-dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { CreateTransferModel } from '../../../models/transactions/create-transfer.model';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { DialogService } from '../../../services/dialog/dialog.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-transfer-other-accounts-dialog',
  imports: [MatDialogModule, MatButtonModule, MatSelectModule,
    ReactiveFormsModule,
    MatInputModule],
  templateUrl: './transfer-other-accounts-dialog.component.html',
  styleUrl: './transfer-other-accounts-dialog.component.css'
})
export class TransferOtherAccountsDialogComponent extends
  BaseDialog<TransferOtherAccountsDialogComponent, AccountModel> {
  private formBuilder = inject(FormBuilder);
  private transactionService = inject(TransactionService);
  private dialogService = inject(DialogService);


  onClose(): void {
    this.dialogRef.close(false);
  }

  public get amount() {
    return this.transferForm.get('amount');
  }

  public get toAccountCode() {
    return this.transferForm.get('toAccountCode');
  }

  transferForm: FormGroup = this.formBuilder.group({
    fromAccountCode: [this.data.code, [Validators.required]],
    toAccountCode: ['', [Validators.required]],
    channel: ['Web', [Validators.required]],
    amount: [0, [Validators.required, Validators.min(1)]]
  })

  onSubmit() {
    if (this.transferForm.valid) {
      this.dialogService.open({
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
