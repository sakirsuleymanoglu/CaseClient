import { Component, inject, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { ConfirmDialogComponent } from '../../components/dialogs/confirm-dialog/confirm-dialog.component';
import { AccountsComponent } from "./components/accounts/accounts.component";
import { AccountComponent } from './components/account/account.component';
import { User } from '../../user';

@Component({
  selector: 'app-home',
  imports: [AccountsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  private dialogService = inject(DialogService);

  openDialog() {
    this.dialogService.open<boolean>(ConfirmDialogComponent, (value: boolean | undefined) => {


    });


  }

}
