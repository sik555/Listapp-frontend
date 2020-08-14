
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserServiceService } from '../../services/user-service.service';
import { OnInit, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { List } from 'app/models/list.model';
import { Store } from '@ngxs/store';
import { ListServiceService } from 'app/services/List-service.service';
import { Item } from 'app/models/item.model';

@Component({
  selector: 'app-detailList',
  templateUrl: './detailList.component.html',
  styleUrls: ['./detailList.component.css']
})
export class DetailListComponent implements OnInit {
  error:string = "";
  user : User;
  public listDetail : List;
  public edit : boolean = false

  public newitemtitle : string;
  public newitemdescription : string;

  constructor(private listServiceService:ListServiceService,private router: Router,public matDialog: MatDialog,private store: Store, @Inject(MAT_DIALOG_DATA) data) {
    this.listDetail = data
   }

  ngOnInit() {
    
    this.store.select(state => state.LoginUserState.loggedInUser).subscribe(
      (res) => {
          this.user = res
        }
    )

    
    console.log(this.listDetail);
  }

  updateList(list: List){
   let userCreated = null;

   list.owner = this.user;

    if(list.title == "" || list.description == "" ){
      this.error = "please fill in all the fields"
    }else{
      this.error = ""
    }

    if(this.error == "") {
    let result = this.listServiceService.Update_List(list.id,list);
    
    result.subscribe(
      (res)=>{
      this.matDialog.getDialogById("createList").close();},
      (error)=>{
        this.error = error.error
      }
    )
    }
  }

  addItem(){
    let newitem :Item = {
      id:"",
      title:this.newitemtitle,
      description:this.newitemdescription,
      image:"",
      votes:[]
    } ;

    newitem.title = this.newitemtitle;
    newitem.description = this.newitemdescription;
    
    if(this.listDetail.items == undefined){
      this.listDetail.items = []
     
      this.listDetail.items.push(newitem)
    }else{
      this.listDetail.items.push(newitem)
    }
    
  }

  savelist(){
    
    this.listServiceService.Update_List(this.listDetail.id,this.listDetail);
  }

  voteItem(id :string){
    var item = this.listDetail.items.find(x => x.id == id)
    var vote = item.votes.find(x => x.Id == this.user.Id)
    if(vote == null){
      item.votes.push(this.user)
    }else{
      this.error = "you already voted on this item."
    }
  }
}
