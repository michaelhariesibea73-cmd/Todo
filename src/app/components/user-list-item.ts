import { Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'tr',
  imports: [],
  template: `
    <style>
      td {
        text-align: center;
      }
    </style>
    <td>{{ user.id }}</td>
    @if (this.isEditable()) {
    <td><input #input_username type="text" [value]="user.username" /></td>
    <td><input #input_password type="text" [value]="user.password" /></td>
    <button class="btn" (click)="update()">save</button>
    <button class="btn btn-cancel" (click)="cancel()">Cancel</button>
    } @if (!this.isEditable()) {
    <td>{{ user.username }}</td>
    <td>{{ user.password }}</td>
    <td>
      <button (click)="edit_user(user)"><i class="far fa-edit"></i></button>
      <button (click)="delete_user(user.id)"><i class="far fa-trash-alt"></i></button>
    </td>
    }
    <div>test</div>
  `,
})
export class UserListItem {
  isEditable = signal<boolean>(false);

  @ViewChild('input_password') input_password!: ElementRef<HTMLInputElement>;
  @ViewChild('input_username') input_username!: ElementRef<HTMLInputElement>;

  @Input() user!: User;
  @Input() users!: User[];
  @Output() usersChange = new EventEmitter<User[]>();
  @Input() user_now!: User;
  @Output() user_nowChange = new EventEmitter<User>();
  @Input() view_modal!: boolean;
  @Output() view_modalChange = new EventEmitter<boolean>();

  edit_user(user: User) {
    this.isEditable.set(true);
    this.user_nowChange.emit(user);
    this.view_modalChange.emit(true);
  }
  delete_user(id: number) {
    this.usersChange.emit(this.users.filter((user) => user.id != id));
  }
  update() {
    let indexToUpdate = this.users.findIndex((item) => item.id === this.user.id);
    this.users[indexToUpdate] = {
      id: this.user.id,
      username: this.input_username.nativeElement.value,
      password: this.input_password.nativeElement.value,
    };
    this.usersChange.emit(this.users);
    this.view_modalChange.emit(false);
    this.isEditable.set(false);
  }
  cancel() {
    this.isEditable.set(false);
  }
}
