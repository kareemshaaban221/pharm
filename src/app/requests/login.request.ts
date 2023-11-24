import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IBaseRequest } from "./ibase.request";

@Injectable({
  providedIn: 'root'
})
export class LoginRequest implements IBaseRequest {

  constructor(
    private email: FormControl,
    private password: FormControl) { }

  markAsTouched(): void {
    this.email.markAsTouched();
    this.password.markAsTouched();
  }


  getUrl(api_url: string): string {
    return api_url + '/login';
  }

  isValid(): boolean {
    return this.email.valid && this.password.valid;
  }

  getEmail(): string {
    return this.email.value;
  }

  getPassword(): string {
    return this.password.value;
  }

  toObject(): Object {
    return {
      email: this.getEmail(),
      password: this.getPassword()
    };
  }
}
