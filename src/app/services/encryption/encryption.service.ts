import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private _secretKey: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse("1234567890123456");

  constructor() { }

  encrypt(plainText: string) {
    let encryptedBytes = CryptoJS.AES.encrypt(plainText, this._secretKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encryptedBytes.toString();
  }

  decrypt(cipherText: string) {
    let decryptedBytes = CryptoJS.AES.decrypt(cipherText, this._secretKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }
}
