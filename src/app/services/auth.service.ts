import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Auth } from '../models/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseRequest } from '../requests/ibase.request';
import { Response } from '../responses/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.api_url

  constructor(
    public auth: Auth,
    public http: HttpClient) { }

  authenticate(request: IBaseRequest): Observable<Auth|Response> {
    console.log(request.toObject());

    return this.http.post<Auth|Response>(request.getUrl(this.url), request.toObject());
  }
}
