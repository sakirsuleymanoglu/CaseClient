import { Component, inject, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { AccountComponent } from "../account/account.component";
import { AccountModel } from '../../../../models/accounts/account.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../../../services/dialog/dialog.service';
import { CreateAccountDialogComponent } from '../../../../components/dialogs/create-account-dialog/create-account-dialog.component';
import { runTransferSingalR } from '../../../../services/signalr/transfer-signalr.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../../services/account/account.service';

@Component({
  selector: 'app-accounts',
  imports: [MatTabsModule, AccountComponent, MatIconModule, MatButtonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent implements OnInit {
  private toastrService = inject(ToastrService);
  private accountService = inject(AccountService);
  private dialogService = inject(DialogService);
  tabSelectedIndex: number = 0;
  items: AccountModel[] = [];

  constructor() {

    runTransferSingalR({
      onNewTransfer: async (data) => {
        this.toastrService.success(`${data.senderUserName} tarafından ${data.toAccountCode} kodlu hesabınıza ₺${data.amount} transfer yapıldı`, "Yeni Transfer", {
          closeButton: true,
          positionClass: 'toast-bottom-full-width',
          timeOut: 20000
        })
        await this.getAccounts();
      }
    })
  }

  async ngOnInit() {
    await this.getAccounts();
  }

  onTabSelectedChange(event: MatTabChangeEvent) {
    this.tabSelectedIndex = event.index;
  }

  openCreateAccountDialog() {
    this.dialogService.open({
      compononent: CreateAccountDialogComponent,
      onAfterClosed: async (value: boolean | undefined) => {
        if (value) {
          await this.getAccounts();
        }
      },
      width: "500px",
      height: "300px"
    })
  }

  async onTransfer() {
    await this.getAccounts();
  }

  async getAccounts() {
    this.items = [];
    this.items = await this.accountService.getAll();
  }
}
