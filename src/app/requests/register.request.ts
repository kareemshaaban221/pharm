import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IBaseRequest } from "./ibase.request";
import { IFormRequest } from "./iform.request";

export class RegisterRequest implements IBaseRequest, IFormRequest {

  constructor(
    private formControls: FormControl[]) { }

  markAsTouched(): void {
    for (let formControl of this.formControls)
      formControl.markAsTouched();
  }

  getUrl(api_url: string): string {
    return api_url + '/register';
  }

  isValid(): boolean {
    let valid = true;
    for (let formControl of this.formControls)
      valid = valid && formControl.valid;
    return valid;
  }

  getEmail(): string {
    return this.formControls[0].value;
  }

  getPassword(): string {
    return this.formControls[1].value;
  }

  getName(): string {
    return this.formControls[2].value;
  }

  getPhone(): string {
    return this.formControls[3].value;
  }

  getStockId(): string {
    return this.formControls[4].value;
  }

  toObject(): Object {
    return {
      name: this.getName(),
      email: this.getEmail(),
      password: this.getPassword(),
      stock_id: this.getStockId(),
      phone: this.getPhone()
    };
  }
}
