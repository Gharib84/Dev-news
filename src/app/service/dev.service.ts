import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apikey } from '../core/apikey';
import { Item } from '../core/interfaces/item';
@Injectable({
  providedIn: 'root'
})
export class DevService {
  private http = inject(HttpClient);
  constructor() { }

  articles(): Observable<Item[] | undefined> {
    return this.http.get<Item[]>(`${Apikey.API_URL}`);
  }
}
