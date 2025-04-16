import { Component, Input } from '@angular/core';
import { AccountModel } from '../../../../models/accounts/account.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-account',
  imports:[MatCardModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  @Input() account! : AccountModel;
}
