import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClientService } from '../http-client/http-client.service';
import { CreateTransferModel } from '../../models/transactions/create-transfer.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private httpClientService = inject(HttpClientService);
  private spinnerService = inject(NgxSpinnerService);
  private toastrService = inject(ToastrService);

  private basePath: string = 'accounttransactions';

  async create(model: CreateTransferModel, onSucces?: () => void) {
    this.spinnerService.show();
    await lastValueFrom(this.httpClientService.post<CreateTransferModel, any>({
      path: `${this.basePath}/create-transfer`
    }, model))
      .then(_ => {
        this.toastrService.success('Transfer gerçekleşti')
        if (onSucces) {
          onSucces();
        }
      })
      .finally(() => {
        this.spinnerService.hide();
      });
  }

}
