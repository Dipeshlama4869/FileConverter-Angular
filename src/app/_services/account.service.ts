import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../_models/authUser';
import { Register } from '../_models/register';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<AuthUser>;
  public user: Observable<AuthUser>;
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<AuthUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<AuthUser>(null!);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): AuthUser {
    return this.userSubject.value;
  }
  
  login(model: any) {
    console.log(this.baseUrl + 'Account/login')
    return this.http.post(this.baseUrl + 'Account/login', model).pipe(
      map((response: any) => {
        const user = response;
        console.log(user)
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: AuthUser) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  register(model: Register) {
    return this.http.post(this.baseUrl+ '/Users' , model)
  }

  logout(){;
    localStorage.removeItem('user');
    this.currentUserSource.next(null!);
  }
}
