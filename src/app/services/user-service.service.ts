import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserServiceService {
  private url = 'https://localhost:44340/api/User'
  constructor(private http: HttpClient) {}


  public  create_User(user: User){
    let url = this.url;

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json'})
    };
    let userCreated = new User();
    let response
    this.http.post<User>(url,user,httpOptions).subscribe(
      (res) => {
        response = res
      },
      (error)=>{ 
        response = error.error
      }
    );

    return  this.http.post<User>(url,user,httpOptions);
  }

  public Login_User(user:User){
    let url = this.url + "/username";

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json'})
    };

    let response=this.http.post<User>(url,user,httpOptions);

    return response;
  }

  public getUser(id:string):Observable<User>{
    let url = this.url + "/" + id

    let response=this.http.get<User>(url);

    return response
  }
}
