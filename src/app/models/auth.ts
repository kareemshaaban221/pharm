import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class Auth {
  user  : User|undefined;
  token : string|undefined;

  static getInstance(): Auth {
    let authInstance = new Auth();
    if (localStorage.getItem('auth')) {
      let localAuth = JSON.parse(localStorage.getItem('auth') ?? '{}');
      authInstance.user = User.getInstance(localAuth.data);
      authInstance.token = localAuth.token;
    }
    return authInstance;
  }

  static check(): boolean {
    return localStorage.getItem('auth') ? true : false;
  }

  logout() {
    localStorage.removeItem('auth');
    delete(this.token);
    delete(this.user);
  }
}
