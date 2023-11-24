import { ErrorResponse } from './../../responses/error.response';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Auth } from 'src/app/models/auth';
import { LoginRequest } from 'src/app/requests/login.request';
import { Response } from 'src/app/responses/response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email     = new FormControl('');
  password  = new FormControl('');
  errors: any;
  request: LoginRequest;

  constructor(
    public authService: AuthService,
    public router: Router) {
    this.request = new LoginRequest(this.email, this.password);
  }

  login() {
    this.request.markAsTouched();
    if (this.request.isValid()) {
      this.authService.authenticate(this.request).subscribe({
        next: (data: Auth|Response) => {
          this.errors = [];
          localStorage.setItem('auth', JSON.stringify(data));
          this.router.navigateByUrl('/home');
        },
        error: (data: any) => {
          this.errors = data.error.errors;
          for (let input in this.errors) {
            if (input == 'email') this.email.setErrors({'email': 'invalid'});
            if (input == 'password') this.password.setErrors({'password': 'invalid'});
          }
        }
      });
    }
  }
}
