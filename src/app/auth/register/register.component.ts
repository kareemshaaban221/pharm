import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth';
import { Stock } from 'src/app/models/stock';
import { LoginRequest } from 'src/app/requests/login.request';
import { RegisterRequest } from 'src/app/requests/register.request';
import { Response } from 'src/app/responses/response';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../shared.css']
})
export class RegisterComponent {
  email     = new FormControl('');
  password  = new FormControl('');
  stock     = new FormControl('');
  name      = new FormControl('');
  phone     = new FormControl('');
  password_confirmation  = new FormControl('');
  errors = [];
  showErrors = false;
  request: RegisterRequest;
  stocks: any;

  constructor(
    public authService: AuthService,
    public router: Router,
    public location: Location,
    public stockService: StockService) {
    this.request = new RegisterRequest(this.getFromControls());
    if (Auth.check()) {
      this.location.back();
    }
    this.getStocks();
  }

  register() {
    this.request.markAsTouched();
    if (!this.isPasswordConfirmed())
      this.password.setErrors({'password': 'invalid'});
    if (this.request.isValid())
      this.sendAuthenticationRequest()
  }

  private sendAuthenticationRequest() {
    this.authService.authenticate(this.request).subscribe({
      next  : (data: Auth|Response) => this.successHandle(data),
      error : (data: any)           => this.errorsHandle(data)
    });
  }

  private successHandle(data: Auth|Response) {
    console.log(data);

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
      else if (input == 'phone') this.phone.setErrors({'phone': 'invalid'});
      else if (input == 'name') this.name.setErrors({'name': 'invalid'});
      else if (input == 'stock') this.stock.setErrors({'stock': 'invalid'});
      else this.password.setErrors({'password': 'invalid'});
    }
  }

  getStocks() {
    this.stockService.getAll().subscribe((data: any) => {
      this.stocks = data.data;
    })
  }

  getFromControls(): FormControl[] {
    return [this.email, this.password, this.name, this.phone, this.stock];
  }

  isPasswordConfirmed(): boolean {
    return this.password.value == this.password_confirmation.value;
  }
}
