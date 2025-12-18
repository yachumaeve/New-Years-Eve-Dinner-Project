import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 定義資料結構（對應資料庫欄位）
export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = '/api/data'; // 配合 Nginx 的反向代理路徑

  constructor(private http: HttpClient) {}

  getUsers(): Observable<{data: User[], message: string}> {
    return this.http.get<{data: User[], message: string}>(this.apiUrl);
  }
}