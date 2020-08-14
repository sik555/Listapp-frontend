import { User, IUser } from "app/models/user";


export class LoginUser {
    static readonly type = '[IUSER] Login'

    constructor(public user : User){}
}

export class LogoutUser{
    static readonly type ='[IUSER] Logout'

    constructor(public user:User){}
}