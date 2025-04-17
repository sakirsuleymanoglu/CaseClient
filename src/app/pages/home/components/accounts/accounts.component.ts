import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { AccountComponent } from "../account/account.component";
import { HttpClientService } from '../../../../services/http-client/http-client.service';
import { AccountModel } from '../../../../models/accounts/account.model';
import { API_BASE_URL } from '../../../../app.config';
import { User } from '../../../../user';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../../../services/dialog/dialog.service';
import { CreateAccountDialogComponent } from '../../../../components/dialogs/create-account-dialog/create-account-dialog.component';

@Component({
  selector: 'app-accounts',
  imports: [MatTabsModule, AccountComponent, MatIconModule, MatButtonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent implements OnInit {

  constructor(@Inject(API_BASE_URL) private baseUrl: string,
    private user: User
  ) { }

  @ViewChild(MatTabGroup) matTabGroup!: MatTabGroup;
  tabSelectedIndex: number = 0;

  onTabSelectedChange(event: MatTabChangeEvent) {
    this.tabSelectedIndex = event.index;
  }

  openCreateAccountDialog() {
    this.dialogService.open({
      compononent: CreateAccountDialogComponent,
      data: this.user.id,
      onAfterClosed: (value: boolean | undefined) => {
        if (value) {
          this.getAccounts();
        }
      },
      width: "500px",
      height: "300px"
    })
  }

  private httpClientService = inject(HttpClientService);
  private dialogService = inject(DialogService);

  items: AccountModel[] = [];

  onTransfer() {
    this.getAccounts();
  }

  getAccounts() {
    this.items = [];
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
      },
    });

 
  }

  ngOnInit() {
    this.getAccounts();
  }
}
