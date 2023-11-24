import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IBaseRequest } from "./ibase.request";

@Injectable({
  providedIn: 'root'
})
export class RegisterRequest implements IBaseRequest {

  constructor(
    private email: FormControl,
    private password: FormControl) { }

  markAsTouched(): void {
    throw new Error("Method not implemented.");
  }

  getUrl(api_url: string): string {
    return api_url + '/register';
  }

  isValid(): boolean {
    return this.email.valid && this.password.valid;
  }

  toObject(): Object {
    return {
      email: this.email,
      password: this.password
    };
  }
}
