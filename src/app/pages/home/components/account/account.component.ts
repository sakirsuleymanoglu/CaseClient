import { Component, Input } from '@angular/core';
import { AccountModel } from '../../../../models/accounts/account.model';
import { MatCardModule } from '@angular/material/card';
import { TransactionsComponent } from "../transactions/transactions.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-account',
  imports: [MatCardModule, TransactionsComponent, MatMenuModule, MatButtonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  @Input() account!: AccountModel;

  transferMyAccounts() {

  }

  transferOtherAccounts() {

  }
}
