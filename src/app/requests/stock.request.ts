import { Injectable } from "@angular/core";
import { IBaseRequest } from "./ibase.request";

@Injectable({
  providedIn: 'root',
})
export class StockRequest implements IBaseRequest {

  toObject(): Object {
    return {};
  }

  getUrl(api_url: string): string {
    return api_url + '/stocks';
  }

}
