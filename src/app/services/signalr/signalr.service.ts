import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { JwtService } from '../jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private jwtService = inject(JwtService);
  private hubConnection: signalR.HubConnection;

  public get connection() {
    return this.hubConnection;
  }

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7159/transfer-hub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => this.jwtService.getJwtInStorage() ?? ""
      })
      .build();

    this.hubConnection.start()
      .catch(err => console.error(err));
  }
}
