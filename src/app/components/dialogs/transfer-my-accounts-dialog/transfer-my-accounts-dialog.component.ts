import { Component, Inject, inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { AccountModel } from '../../../models/accounts/account.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { HttpClientService } from '../../../services/http-client/http-client.service';
import { API_BASE_URL } from '../../../app.config';
import { User } from '../../../user';
import { TransferModel } from '../../../models/transactions/transfer.model';
import { lastValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


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

  constructor(@Inject(API_BASE_URL) private baseUrl: string,
  ) {
    super()

  }
  ngOnInit() {
    this.getAccounts();
  }

  private formBuilder = inject(FormBuilder);
  private httpClientService = inject(HttpClientService);
  private user = inject(User);
  private spinnerService = inject(NgxSpinnerService);
  private toastrService = inject(ToastrService);

  accounts: AccountModel[] = [];

  getAccounts() {
    this.httpClientService.get<AccountModel[]>({
      baseUrl: this.baseUrl,
      path: "accounts",
      queryParameters: [{
        key: "appUserId",
        value: this.user.id
      }]
    }).subscribe({
      next: (value) => {
        this.accounts = value.filter(x => x.id != this.data.id);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  transferForm: FormGroup = this.formBuilder.group({
    fromAccountCode: [this.data.code, [Validators.required]],
    toAccountCode: ['', [Validators.required]],
    channel: ['Web', [Validators.required]],
    amount: [0, [Validators.required, Validators.min(1)]]
  })

  submitTransferForm() {
    if (this.transferForm.valid) {
      this.spinnerService.show();
      lastValueFrom(this.httpClientService.post<TransferModel, undefined>({
        baseUrl: this.baseUrl,
        path: "accounttransactions/create-transfer",
      }, {
        amount: this.transferForm.value.amount,
        channel: this.transferForm.value.channel,
        fromAccountCode: this.transferForm.value.fromAccountCode,
        toAccountCode: this.transferForm.value.toAccountCode
      })).then((_) => {
        this.toastrService.success("Para transferi gerçekleşti", "Para Transferi - Kendi Hesabıma")
        this.dialogRef.close(true);
      }).finally(() => {
        this.spinnerService.hide();
      });
    }
  }
}
