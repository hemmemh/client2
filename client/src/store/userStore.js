import { makeAutoObservable } from "mobx"

export default class UserStore{

    constructor(){
        this._user={}
        this._users=[]
        this._auth=false
        this._activeUser={}
        makeAutoObservable(this)
    }

    setUser(user){
        this._user = user
    }
    setactiveUser(user){
        this._activeUser = user
    }
    setUsers(users){
        this._users = users
    }

    setAuth(bool){
        this._auth = bool
    }

    get user(){
        return this._user
    }

    get users(){
        return this._users
    }
    get activeUser(){
        return this._activeUser
    }

    get auth(){
        return this._auth
    }
}
