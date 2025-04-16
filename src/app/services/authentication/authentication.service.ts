import { Inject, inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client/http-client.service';
import { API_BASE_URL } from '../../app.config';
import { LoginModel } from '../../models/authentication/login.model';
import { EncryptionService } from '../encryption/encryption.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreatedJwtModel } from '../../models/authentication/created-jwt.model';
import { JwtService } from '../jwt/jwt.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(API_BASE_URL) private baseUrl: string,
private route:ActivatedRoute) { }

  private httpClientService = inject(HttpClientService);
  private encryptionService = inject(EncryptionService);
  private spinnerService = inject(NgxSpinnerService);
  private jwtService = inject(JwtService);
  private router = inject(Router);

  logout(){
    this.jwtService.deleteJwtInStorage();
    this.router.navigate(['/'])
  }

  async login(model: LoginModel) {
    this.spinnerService.show();
    model.password = this.encryptionService.encrypt(model.password);
    await lastValueFrom(this.httpClientService.post<LoginModel, CreatedJwtModel>({
      baseUrl: this.baseUrl,
      path: 'authentication/login',
    }, model)).then((createdJwt: CreatedJwtModel) => {
      this.jwtService.addJwtToStorage(createdJwt.token);
      this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/home')
    }).finally(() => {
      this.spinnerService.hide();
    });
  }

}
