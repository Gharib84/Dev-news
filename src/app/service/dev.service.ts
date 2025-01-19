import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apikey } from '../core/apikey';
@Injectable({
  providedIn: 'root'
})
export class DevService {
  private http = inject(HttpClient);
  constructor() { }

  articles(): Observable<any> {
    return this.http.get(`${Apikey.API_URL}`);
  }
}
