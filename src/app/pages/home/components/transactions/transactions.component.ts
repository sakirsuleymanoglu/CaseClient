import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { API_BASE_URL } from '../../../../app.config';
import { HttpClientService } from '../../../../services/http-client/http-client.service';
import { TransactionModel } from '../../../../models/transactions/transaction.model';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  selector: 'app-transactions',
  imports: [TransactionComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  constructor(@Inject(API_BASE_URL) private baseUrl: string

  ) { }

  @Input() accountId!: string;

  private httpClientService = inject(HttpClientService);

  items: TransactionModel[] = [];

  getTransactions() {
    this.httpClientService.get<TransactionModel[]>({
      baseUrl: this.baseUrl,
      path: "accounts",
      routeParameters: [this.accountId, "transactions"]
    }).subscribe({
      next: (value) => {
        this.items = value;
      }
    });
  }

  ngOnInit() {
    this.getTransactions();
  }
}
