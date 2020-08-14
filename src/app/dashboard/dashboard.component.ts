import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'app/models/customer.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { MessageService } from 'primeng/api';
import { HubConnection } from '@aspnet/signalr';
import { ListServiceService } from 'app/services/List-service.service';
import { List } from 'app/models/list.model';
import { Store } from '@ngxs/store';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateListComponent } from './create list/create-list.component';
import { User } from 'app/models/user';
import { DetailListComponent } from './Detail list/detailList.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  
  votedlists : Array<List> = new Array<List>();
  lists :  Array<List> = new Array<List>();
  loggedInUser : User
  loggedInUserId : string
  constructor(private router: Router,private listServiceService: ListServiceService,private store: Store,public matDialog: MatDialog){}
    



  ngOnInit() {
    this.store.select(state => state.LoginUserState.loggedInUser).subscribe(
      (res) => {
          this.loggedInUser = res
          this.votedlists = this.listServiceService.getVotedList(this.loggedInUser.Id);
        }
    );

    
    
    this.listServiceService.getlists().subscribe(
      (res) => {
        this.lists = res
      }
    );
    
  }

  addList(){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "createList";
    dialogConfig.height = "400px";
    dialogConfig.width = "700px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(CreateListComponent, dialogConfig);
  }

  removeList(id:string,owner:User){
     
      this.listServiceService.removeList(id);
      setTimeout(()=>{
        this.ngOnInit();
      },200)
  }

  detailList(list: List){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "DetailList";
    dialogConfig.height = "800px";
    dialogConfig.data = list
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(DetailListComponent, dialogConfig);
  }

  
}
