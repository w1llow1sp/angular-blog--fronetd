import {Injectable} from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}
  public saveDataFromLocalStorage(key: string, value: string) {
    return localStorage.setItem(key, value)
  }

  public getDataFromLocalStorage(key: string): string {
    let value = localStorage.getItem(key);
    if (value != null) {
      return value;
    } else {
      return '';
    }
  }

  public removeDataFromLocalStorage(key:string) {
    localStorage.removeItem(key)
  }
  public clearDataFromLocalStorage() {
    localStorage.clear()
  }
}
