import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule, MatIconButton, MatIcon, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authenticationService = inject(AuthenticationService);

  logout() {
    this.authenticationService.logout();
  }
}
