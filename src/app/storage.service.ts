import { Injectable, InjectionToken, Inject } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage>('localStorage', {
  providedIn: 'root',
  factory: () => localStorage
});

export const SESSION_STORAGE = new InjectionToken<Storage>('sessionStorage', {
  providedIn: 'root',
  factory: () => sessionStorage
});

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    @Inject(LOCAL_STORAGE) public storage: Storage,
    @Inject(SESSION_STORAGE) public session: Storage
  ) { }

  get(key: string, localStorage: boolean = true) {
    if (localStorage) {
      return JSON.parse(this.storage.getItem(key));
    }
    return JSON.parse(this.session.getItem(key));
  }

  set(key: string, value: any, localStorage: boolean = true) {
    if (localStorage) {
      this.storage.setItem(key, JSON.stringify(value));
    } else {
      this.session.setItem(key, JSON.stringify(value));
    }
  }

  remove(key: string, localStorage: boolean = true) {
    if (localStorage) {
      this.storage.removeItem(key);
    } else {
      this.session.removeItem(key);
    }
  }

  clear(localStorage: boolean = true) {
    if (localStorage) {
      this.storage.clear();
    } else {
      this.session.clear();
    }
  }
}
