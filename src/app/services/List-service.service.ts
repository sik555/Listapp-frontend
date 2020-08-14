import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { List } from 'app/models/list.model';
import { Observable } from 'rxjs';

@Injectable()
export class ListServiceService {
  private url = 'https://localhost:44340/api/List'
  constructor(private http: HttpClient) {}


  public getVotedList( userid: string){
      let url = this.url +'/votedlist/' + userid

      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json'})
      };

      let response;
      this.http.post<List>(url,"",httpOptions).subscribe(
          (res) => {
              response = res
          },
          (error) => {
              response = error.error
          }
      )

      return response
  }

    public getlists(): Observable<Array<List>>{
        let url = this.url;

        console.log(this.http.get<Array<List>>(url));

        return this.http.get<Array<List>>(url)
    }

  public Create_List(list: List){
    let url = this.url;

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json'})
    };
    console.log(list)
    let response=this.http.post<List>(url,list,httpOptions)

    console.log(response);

    return  response
  }

  public  Update_List(id : string ,list: List){
    let url = this.url + '/' + id;

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json'})
    };
    let response
    this.http.post<User>(url,list,httpOptions).subscribe(
      (res) => {
        response = res
      },
      (error)=>{ 
        response = error.error
      }
    );

    return response
  }

  public removeList(id:string){
      let url = this.url + '/' + id;

      let sub = this.http.delete(url)

      sub.subscribe();
  }
}
