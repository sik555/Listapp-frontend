
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserServiceService } from '../../services/user-service.service';
import { OnInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error:string = "";
  constructor(private userServiceService:UserServiceService,private router: Router,public matDialog: MatDialog) { }

  ngOnInit() {
  }

  Register(user: User){
   let userCreated = null;;
    if(user.email == "" || user.username == "" || user.password == "" ){
      this.error = "please fill in all the fields"
    }else{
      this.error = ""
    }

    if(this.error == "") {
    let result = this.userServiceService.create_User(user);
    
    result.subscribe(
      (res)=>{
      this.matDialog.getDialogById("register").close();},
      (error)=>{
        this.error = error.error
      }
    )
    }
  }
}
