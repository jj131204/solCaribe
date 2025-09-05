import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://10.11.98.16:8000';

  constructor(private http: HttpClient) {}


  getApi<T>(url: string): Observable<T>{
    return this.http.get<T>(`${this.baseUrl}/${url}`);
  }

}
