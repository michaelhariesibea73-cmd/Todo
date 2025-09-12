import { Component, ElementRef, signal, ViewChild } from '@angular/core';

import { User } from './models/user';
import { UserListItem } from './components/user-list-item';
import { HttpClient } from '@angular/common/http';
import { Page } from './models/page';
import { UserService } from './services/userlistService';

@Component({
  selector: 'app-root',
  imports: [UserListItem],
  template: `
    <style>
      main {
        display: flex;
      }
      .content {
        min-width: 762px;
        margin: auto;
      }
      .add_user_wrap {
        margin-bottom: 2rem;
      }

      .btn_add {
        float: right;
      }
      table {
        width: 100%;
      }
      td,
      th {
        text-align: center;
      }
      th {
        background-color: #434141;
        color: white;
      }

      .pagination-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 2rem;
      }
      .controll-wrap .btn {
        margin-left: 0.5rem;
      }
    </style>
    <main>
      <div class="content">
        <div class="page-title"><h1>User list</h1></div>
        <div class="add_user_wrap">
          <input #input_add_username type="text" placeholder="username" />
          <input #input_add_password type="text" placeholder="password" />
          <button class="btn btn_add" (click)="add()">add</button>
        </div>
        <table>
          <thead>
            <th>id</th>
            <th>username</th>
            <th>password</th>
            <th>action</th>
          </thead>
          <tbody>
            @for (user of this.users; track $index) {
            <tr
              [(users)]="users"
              [user]="user"
              [(view_modal)]="view_modal"
              [(user_now)]="user_now"
            ></tr>
            }
          </tbody>
        </table>
        <div class="pagination-wrap">
          total: {{ this.page.total }} pages: {{ this.page.pages }}
          <div>
            page size:
            <select (change)="changesize($event)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <div class="controll-wrap">
            <button class="btn" (click)="firstpage()">first</button>
            <button class="btn" (click)="priviouspage()">privious</button>
            <button class="btn" (click)="nextpage()">next</button>
            <button class="btn" (click)="lastpage()">last</button>
          </div>
        </div>
      </div>
    </main>
  `,
})
export class App {
  view_modal = signal<boolean>(false);

  @ViewChild('input_add_password') input_add_password!: ElementRef<HTMLInputElement>;
  @ViewChild('input_add_username') input_add_username!: ElementRef<HTMLInputElement>;

  user_now = signal<User>({
    id: 1,
    username: 'ssss',
    password: 'ssssss',
  });
  users: User[] = [];

  add() {
    let id = 1;
    if (this.users.length) {
      id = this.users[this.users.length - 1].id + 1;
    }
    this.users.push({
      id: id,
      username: this.input_add_username.nativeElement.value,
      password: this.input_add_password.nativeElement.value,
    });
  }

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.readpage(this.page);
  }
  page: Page = {
    page: 1,
    size: 5,
    total: -1,
    pages: -1,
  };

  readpage(page: Page) {
    this.userService.readpage(page).subscribe({
      next: (res) => {
        this.users = res.payload;
        this.page = res.pagination;
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  nextpage() {
    this.page.page++;
    if (this.page.page > this.page.pages) {
      this.page.page = this.page.pages;
    }
    this.readpage(this.page);
  }
  priviouspage() {
    this.page.page--;
    if (this.page.page < 1) {
      this.page.page = 1;
    }
    this.readpage(this.page);
  }
  firstpage() {
    this.page.page = 1;
    this.readpage(this.page);
  }
  lastpage() {
    this.page.page = this.page.pages;
    this.readpage(this.page);
  }
  changesize(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.page.size = select.value;
    this.readpage(this.page);
  }
}
