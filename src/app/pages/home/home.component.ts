import { Component, inject, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { ConfirmDialogComponent } from '../../components/dialogs/confirm-dialog/confirm-dialog.component';
import { AccountsComponent } from "./components/accounts/accounts.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [AccountsComponent, MatToolbarModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit() {
   //this.openDialog();
  }

  

  private dialogService = inject(DialogService);

  openDialog() {
    this.dialogService.open({
      compononent: ConfirmDialogComponent,
      onAfterClosed:(value: boolean | undefined)=>{
        alert(value);
      }
    });


  }

}
