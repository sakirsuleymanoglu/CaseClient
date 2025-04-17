import { inject } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { JwtService } from '../jwt/jwt.service';
import { API_ROOT_URL } from '../../app.config';
import { NewTransferMessageModel } from '../../models/signalr/new-transfer-message.model';

export class TransferSignalRService {
  private jwtService = inject(JwtService);
  private hubConnection: signalR.HubConnection;
  private rootUrl = inject(API_ROOT_URL);


  start() {
    this.hubConnection.start()
      .then(() => console.log("SignalR Connected"))
      .catch(_ => {
        console.log('SignalR bağlantısı kurulamıyor...!',
          setTimeout(() => this.start(), 5000)
        )
      });
  }


  constructor(
    events: {
      onNewTransfer?: (data: NewTransferMessageModel) => void
    }
  ) {
    const url = `${this.rootUrl}/transfer-hub`;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => this.jwtService.getJwtInStorage() ?? ''
      })
      .withAutomaticReconnect()
      .build();

    this.start();

    if (events.onNewTransfer) {
      this.hubConnection.on('NewTransfer', events.onNewTransfer)
    }
  }
}
