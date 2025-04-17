import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AccountModel } from '../../../models/accounts/account.model';
import { BaseDialog } from '../base-dialog';
import { API_BASE_URL } from '../../../app.config';
import { HttpClientService } from '../../../services/http-client/http-client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { TransferModel } from '../../../models/transactions/transfer.model';

@Component({
  selector: 'app-transfer-other-accounts-dialog',
  imports: [MatDialogModule, MatButtonModule, MatSelectModule,
    ReactiveFormsModule,
    MatInputModule],
  templateUrl: './transfer-other-accounts-dialog.component.html',
  styleUrl: './transfer-other-accounts-dialog.component.css'
})
export class TransferOtherAccountsDialogComponent extends
BaseDialog<TransferOtherAccountsDialogComponent, AccountModel> implements OnInit {

constructor(@Inject(API_BASE_URL) private baseUrl: string,
) {
  super()

}
ngOnInit() {

}

private formBuilder = inject(FormBuilder);
private httpClientService = inject(HttpClientService);
private spinnerService = inject(NgxSpinnerService);
private toastrService = inject(ToastrService);


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
