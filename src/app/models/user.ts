export class User {
  id: number;
  username: string;
  password: string;

  constructor(username: string = '', password: string = '', id: number = 1) {
    this.username = username;
    this.password = password;
    this.id = id;
  }
}
