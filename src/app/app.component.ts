import { Component} from '@angular/core';
import { LoginUserState } from './services/loginuser.state';
import { UserServiceService } from './services/user-service.service';
import { Store } from '@ngxs/store';
import { LoginUser } from './actions/LoginUser.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userServiceService:UserServiceService,private store:Store){ 
    let user = localStorage.getItem("user");

    if (user != null && user != "" && user != undefined){
         
          this.store.dispatch(new LoginUser(JSON.parse(user)))
    }
  }
}
