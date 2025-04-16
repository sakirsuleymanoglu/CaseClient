import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgxSpinnerModule} from "ngx-spinner";
import { User } from './user';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(){
  
  }
}
