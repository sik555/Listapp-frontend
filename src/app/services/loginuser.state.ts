import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, IUser } from 'app/models/user';
import { State, Selector, StateContext,Action } from '@ngxs/store'
import { LoginUser, LogoutUser } from '../actions/LoginUser.actions';

export class UserState { 
  loggedInUser : User
}

@State<UserState>({
  name:'LoginUserState'
})


export class LoginUserState{

  @Selector()
  static getLoginUser(state:UserState){
    return state.loggedInUser;
  }

  @Action(LoginUser)
  login({getState,patchState}: StateContext<UserState>,{user}:LoginUser){
    const state = getState();

    patchState({
      loggedInUser: user
    })
  }

  @Action(LogoutUser)
  logout({getState,patchState}:StateContext<UserState>){
    patchState({
      loggedInUser: getState().loggedInUser = null
    })
  }
}
