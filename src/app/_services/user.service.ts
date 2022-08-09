import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../_models/register';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  addUser(model: Register){
    return this.http.post(this.baseUrl+ '/Users' , model)
  }

  updateUser(id: number, model: Register){
    return this.http.put(this.baseUrl + 'Users/'+ id, model);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + 'Users/' + id);
  }

  getUser(id: number): Observable<any> {
    return this.http.get<User>(this.baseUrl + 'Users/' + id);
  }
}
