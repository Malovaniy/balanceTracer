import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storageKey = 'transactions';
  private readonly storage!: Storage;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      this.storage = window.localStorage;
    }
  }
  getTransactions(): Transaction[] {
    const data = this.storage?.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveTransactions(transactions: Transaction[]): void {
    this.storage?.setItem(this.storageKey, JSON.stringify(transactions));
  }
}
