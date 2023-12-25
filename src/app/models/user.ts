import { Injectable } from "@angular/core";
import { Model } from "./model";

@Injectable({
  providedIn: 'root'
})
export class User extends Model {
  name              : string|undefined;
  email             : string|undefined;
  email_verified_at : Date|undefined;
  phone             : string|undefined;
  stock_id          : number|undefined;

  static getInstance(data: any): User {
    let user = new User();
    user.created_at         = new Date(data.created_at);
    user.updated_at         = new Date(data.updated_at);
    user.id                 = data.id;
    user.name               = data.name;
    user.email              = data.email;
    user.phone              = data.phone;
    user.stock_id           = data.stock_id;
    user.email_verified_at  = new Date(data.email_verified_at);
    return user;
  }
}
