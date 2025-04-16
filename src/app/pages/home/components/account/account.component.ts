import { Component, Input } from '@angular/core';
import { AccountModel } from '../../../../models/accounts/account.model';
import { MatCardModule } from '@angular/material/card';
import { TransactionsComponent } from "../transactions/transactions.component";

@Component({
  selector: 'app-account',
  imports: [MatCardModule, TransactionsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  @Input() account! : AccountModel;
}
