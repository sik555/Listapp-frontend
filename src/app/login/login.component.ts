import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User, IUser } from '../models/user';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { Store } from '@ngxs/store';
import { LoginUser } from '../actions/LoginUser.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  constructor(private userServiceService:UserServiceService,private router: Router,public matDialog: MatDialog, private store:Store) { }
  error = "";
  ngOnInit() {
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "register";
    dialogConfig.height = "400px";
    dialogConfig.width = "700px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(RegisterComponent, dialogConfig);
    
  }

  Login(user:User){
    let loginuser: IUser;

    this.userServiceService.Login_User(user).subscribe(
      (res) => {
        loginuser = res
        localStorage.setItem("user",JSON.stringify(res));
        this.store.dispatch(new LoginUser(loginuser))
        this.matDialog.getDialogById("login").close();     
                                                                                                                                                                                                                                                                 
      },
    (error)=>{
        this.error=error.error
    });

    

  }
}
