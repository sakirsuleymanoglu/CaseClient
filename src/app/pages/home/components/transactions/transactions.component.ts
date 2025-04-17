import { Component, inject, Input, OnInit } from '@angular/core';
import { TransactionModel } from '../../../../models/transactions/transaction.model';
import { TransactionComponent } from '../transaction/transaction.component';
import { AccountService } from '../../../../services/account/account.service';

@Component({
  selector: 'app-transactions',
  imports: [TransactionComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  @Input() accountId!: string;

  private accountService = inject(AccountService);

  items: TransactionModel[] = [];

  async getTransactions() {
    this.items = [];
    this.items = await this.accountService.getTransactions(this.accountId);
  }

  async ngOnInit() {
    await this.getTransactions();
  }
}
