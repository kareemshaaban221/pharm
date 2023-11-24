import { Injectable } from "@angular/core";
import { Model } from "./model";

@Injectable({
  providedIn: 'root'
})
export class Auth extends Model {
  name      : string|undefined;
  email     : string|undefined;
  phone     : string|undefined;
  stock_id  : number|undefined;
  token     : string|undefined;

  isEmpty() {
    return !this.name && !this.email && !this.phone && !this.stock_id && !this.token;
  }
}
