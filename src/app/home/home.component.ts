import { Component } from '@angular/core';
import { Auth } from '../models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  auth: Auth = Auth.getInstance();

  constructor(
    public router: Router) {
    if (!Auth.check()) {
      this.router.navigateByUrl('login');
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('login');
  }
}
