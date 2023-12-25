import { Injectable } from '@angular/core';
import { StockRequest } from '../requests/stock.request';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Stock } from '../models/stock';
import { Response } from '../responses/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  url: string = environment.api_url;

  constructor(
    public stockRequest: StockRequest,
    public http: HttpClient,
  ) { }

  getAll(): Observable<Stock[]|Response> {
    return this.http.get<Stock[]|Response>(this.stockRequest.getUrl(this.url))
  }
}
