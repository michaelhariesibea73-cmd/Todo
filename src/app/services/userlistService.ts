import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/userlist';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  readpage(params: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/readpage`, { params });
  }
}
