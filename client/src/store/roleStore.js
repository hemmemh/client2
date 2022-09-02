import { makeAutoObservable } from "mobx"

export default class RoleStore{

    constructor(){
        this._roles=[]
        this._activeRole={}
        makeAutoObservable(this)
    }

    setRoles(roles){
        this._roles = roles
    }

    setactiveRole(activeRole){
        this._activeRole = activeRole
    }

    

    get roles(){
        return this._roles
    }

    get activeRole(){
        return this._activeRole
    }

   
}
