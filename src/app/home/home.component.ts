import { Component } from '@angular/core';
import { Auth } from '../models/auth';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  auth: Auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') ?? '{}') : new Auth();

  constructor(
    location: Location) {
    console.log(this.auth);

    if (this.auth.isEmpty()) {
      location.back();
    }
  }
}
