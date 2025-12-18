import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, User } from './data'; // 注意這裡路徑要對準 data.ts

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html', // 您的截圖顯示是 app.html
  styleUrls: ['./app.css']    // 您的截圖顯示是 app.css
})
export class AppComponent implements OnInit {
  users: User[] = [];
  message: string = '載入中...';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getUsers().subscribe({
      next: (res) => {
        this.users = res.data;
        this.message = res.message;
      },
      error: (err) => {
        this.message = '無法連線至 API';
      }
    });
  }
}