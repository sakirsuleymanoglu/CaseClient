import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { AccountComponent } from "../account/account.component";

@Component({
  selector: 'app-accounts',
  imports: [MatTabsModule, AccountComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent {
   
}
