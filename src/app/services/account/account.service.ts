import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client/http-client.service';
import { lastValueFrom } from 'rxjs';
import { AccountModel } from '../../models/accounts/account.model';
import { CreateAccountModel } from '../../models/accounts/create-account.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TransactionModel } from '../../models/transactions/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private httpClientService = inject(HttpClientService);
  private spinnerService = inject(NgxSpinnerService);
  private toastrService = inject(ToastrService);

  private basePath: string = 'accounts';

  async getAll(): Promise<AccountModel[]> {
    return await lastValueFrom(this.httpClientService.get<AccountModel[]>({
      path: this.basePath,
    }))
  }

  async create(model: CreateAccountModel, onSucces?: () => void) {
    this.spinnerService.show();
    await lastValueFrom(this.httpClientService.post<CreateAccountModel, any>({
      path: this.basePath
    }, model))
      .then(_ => {
        this.toastrService.success('Hesap oluşturuldu')
        if (onSucces) {
          onSucces();
        }
      })
      .finally(() => {
        this.spinnerService.hide();
      });
  }

  async getTransactions(id: string) {
    return await lastValueFrom(this.httpClientService.get<TransactionModel[]>({
      path: this.basePath,
      routeParameters: [id, 'transactions']
    }))
  }
}
