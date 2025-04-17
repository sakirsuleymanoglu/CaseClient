import { inject, Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private storageService: StorageService = inject(StorageService);

  private _key: string = 'case_client_jwt';

  addJwtToStorage(token: string) {
    this.storageService.add(this._key, token, sessionStorage);
  }

  deleteJwtInStorage(){
    this.storageService.delete(this._key,sessionStorage);
  }

  getJwtInStorage(){
    return this.storageService.get(this._key,sessionStorage);
  }

  checkIfUseableJwtInStorage(){
    return this.checkIfUseableToken(this.storageService.get(this._key,sessionStorage) ?? '');
  }

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  private checkIfUseableToken(token: string): boolean {
    let result: boolean = true;

    try {
      let expiredResult: boolean = this.tokenExpired(token);

      if (expiredResult) {
        result = false;
      }
    } catch {
      result = false;
    }

    return result;
  }
}
