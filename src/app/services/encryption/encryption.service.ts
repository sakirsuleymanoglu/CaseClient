import { inject, Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { ENCRYPTION_SECRET_KEY } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private secretKey = inject(ENCRYPTION_SECRET_KEY);
  private _key: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(this.secretKey);

  encrypt(plainText: string) {
    let encryptedBytes = CryptoJS.AES.encrypt(plainText, this._key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encryptedBytes.toString();
  }

  decrypt(cipherText: string) {
    let decryptedBytes = CryptoJS.AES.decrypt(cipherText, this._key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }
}
