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

  public checkAndAddDataToStorage(id: string, username: string) {
    let data = JSON.parse(this.getDataFromLocalStorage('data') || '[]');
    const newData = { id, username };

    if (data) {
      const existingDataIndex = data.findIndex((item: any) => item.id === id);
      if (existingDataIndex !== -1) {
        data.splice(existingDataIndex, 1); // Удаляем существующий элемент, если найден
      }
    } else {
      data = []; // Если массив данных не существует, создаем пустой массив
    }

    data.push(newData); // Добавляем новые данные в массив

    this.saveDataFromLocalStorage('data', JSON.stringify(data)); // Сохраняем обновленный массив в Local Storage
  }

  public removeDataFromLocalStorage(key:string) {
    localStorage.removeItem(key)
  }
  public clearDataFromLocalStorage() {
    localStorage.clear()
  }
}
