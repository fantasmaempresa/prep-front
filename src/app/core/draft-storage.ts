import { tap } from 'rxjs';

export class DraftStorage {
  private storage = localStorage;

  constructor(private _keyToStorage: string) {}

  getDraft<T>(): T | null {
    const item = this.storage.getItem(this._keyToStorage);
    if (!item) return null;
    return JSON.parse(item) as T;
  }

  clearDraft() {
    this.storage.removeItem(this._keyToStorage);
  }

  saveDraftOnValueChange<T>() {
    return tap((value: T) => {
      this.storage.setItem(this._keyToStorage, JSON.stringify(value));
    });
  }
}
