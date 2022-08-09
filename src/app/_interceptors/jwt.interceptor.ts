import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isLoggedIn = user && user.Token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if(isLoggedIn && isApiUrl){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${user.Token}`}
      })
    }

    return next.handle(request);
  }
}
