import { Component, Inject, inject, OnInit, runInInjectionContext } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountComponent } from "../account/account.component";
import { HttpClientService } from '../../../../services/http-client/http-client.service';
import { AccountModel } from '../../../../models/accounts/account.model';
import { API_BASE_URL } from '../../../../app.config';
import { User } from '../../../../user';


@Component({
  selector: 'app-accounts',
  imports: [MatTabsModule, AccountComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent implements OnInit {

  constructor(@Inject(API_BASE_URL) private baseUrl: string,
    private user: User
  ) { }

  private httpClientService = inject(HttpClientService);

  items: AccountModel[] = [];

  ngOnInit() {
    this.httpClientService.get<AccountModel[]>({
      baseUrl: this.baseUrl,
      path: "accounts",
      queryParameters: [{
        key: "appUserId",
        value: this.user.id
      }]
    }).subscribe({
      next: (value) => {
        this.items = value;
      }
    });
  }
}
