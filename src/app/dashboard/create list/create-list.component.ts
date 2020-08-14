
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { OnInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { List } from 'app/models/list.model';
import { Store } from '@ngxs/store';
import { ListServiceService } from 'app/services/List-service.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
  error:string = "";
  user : User;
  constructor(private listServiceService:ListServiceService,private router: Router,public matDialog: MatDialog,private store: Store) { }

  ngOnInit() {
    this.store.select(state => state.LoginUserState.loggedInUser).subscribe(
      (res) => {
          this.user = res
        }
    )
  }

  createList(list: List){
   let userCreated = null;
    list.items = [];
   list.owner = this.user;

    if(list.title == "" || list.description == "" ){
      this.error = "please fill in all the fields"
    }else{
      this.error = ""
    }

    if(this.error == "") {
    let result = this.listServiceService.Create_List(list);
    
    result.subscribe(
      (res)=>{
      this.matDialog.getDialogById("createList").close();},
      (error)=>{
        this.error = error.error
      }
    )
    }
  }
}
