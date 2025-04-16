import { Component, inject, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { ConfirmDialogComponent } from '../../components/dialogs/confirm-dialog/confirm-dialog.component';
import { AccountsComponent } from "./components/accounts/accounts.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  imports: [AccountsComponent, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
  private authenticationService = inject(AuthenticationService);

  logout() {
    this.authenticationService.logout();
  }
}
