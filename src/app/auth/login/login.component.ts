import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth';
import { LoginRequest } from 'src/app/requests/login.request';
import { Response } from 'src/app/responses/response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../shared.css']
})
export class LoginComponent {
  email     = new FormControl('');
  password  = new FormControl('');
  errors = [];
  showErrors = false;
  request: LoginRequest;

  constructor(
    public authService: AuthService,
    public router: Router,
    public location: Location) {
    this.request = new LoginRequest(this.email, this.password);
    if (Auth.check()) {
      this.location.back();
    }
  }

  login() {
    this.request.markAsTouched();
    if (this.request.isValid()) {
      this.authService.authenticate(this.request).subscribe({
        next  : (data: Auth|Response) => this.successHandle(data),
        error : (data: any)           => this.errorsHandle(data)
      });
    }
  }

  private successHandle(data: Auth|Response) {
    this.errors = [];
    this.showErrors = false;
    localStorage.setItem('auth', JSON.stringify(data));
    this.router.navigateByUrl('home');
  }

  private errorsHandle(data: any) {
    this.errors = data.error.errors;
    this.showErrors = typeof this.errors != 'undefined';
    for (let input in this.errors) {
      if (input == 'email') this.email.setErrors({'email': 'invalid'});
      else this.password.setErrors({'password': 'invalid'});
    }
  }
}
