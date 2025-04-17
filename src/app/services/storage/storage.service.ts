import { inject, Injectable } from '@angular/core';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private encryptionService = inject(EncryptionService);

  add(key: string, value: string, storage: Storage = localStorage) {
    storage.setItem(key, this.encryptionService.encrypt(value));
  }

  get(key: string, storage: Storage = localStorage): string | null {
    let item = storage.getItem(key);
    if (item) {
      return this.encryptionService.decrypt(item);
    }
    return null;
  }

  delete(key: string, storage: Storage = localStorage) {
    storage.removeItem(key);
  }

  deleteAll(storage: Storage = localStorage) {
    storage.clear();
  }
}
