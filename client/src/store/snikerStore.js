import { makeAutoObservable } from "mobx"

export default class SnikerStore{

    constructor(){
        this._snikers=[]
        this._memoSnikers=[]
        this._activesniker={}
        this._types=[]
        this._basket=[]
        this._basketref=[]
        this._price=0
        this._count=0
        this._page=1
        this._limit=6
        this._totalCount=0
        this._brands=[]
        this._activebrand={}
        this._activetype={}
        this._devicebrand={}
        this._devicetype={}
        this._auth=false
        this._snikkersLoading=false
        this._TypesAndBrandLoading=false
        this._oneSnikerLoading=false
        this._oneBrandAndTypeLoading={}

        makeAutoObservable(this)
    }

    setmemoSnikers(memoSnikers){
        this._memoSnikers = memoSnikers
    }

    setOneBrandAndTypeLoading(oneBrandAndTypeLoading){
        this._oneBrandAndTypeLoading = oneBrandAndTypeLoading
    }

    setTypesAndBrandLoading(TypesAndBrandLoading){
        this._TypesAndBrandLoading = TypesAndBrandLoading
    }

    setLimit(limit){
        this._limit = limit
    }
    
    setOneSnikerLoading(oneSnikerLoading){
        this._oneSnikerLoading = oneSnikerLoading
    }
    setSnikkersLoading(load){
        this._snikkersLoading = load
    }

    
    setPrice(price){
        this._price = price
    }

    setCount(count){
        this._count = count
    }

    setBasket(basket){
        this._basket = basket
    }
    setBasketRef(basket){
        this._basketref = basket
    }

    setdevicebrand(devicebrand){
        this._devicebrand = devicebrand
    }

    setdevicetype(devicetype){
        this._devicetype = devicetype
    }

    setPage(page){
        this._page = page
    }

    setTotalCount(totalCount){
        this._totalCount = totalCount
    }


    setTypes(type){
        this._types = type
    }

    setActiveBrand(brand){
        this._activebrand = brand
    }

    setActiveSniker(sniker){
        this._activesniker= sniker
    }

    setActiveTypes(type){
        this._activetype = type
    }

    setBrand(brand){
        this._brands = brand
    }

    setSnikers(sniker){
        this._snikers = sniker
    }
    
    
    get type(){
        return this._types
    }
    
    get TypesAndBrandLoading(){
        return this._TypesAndBrandLoading
    }
    
    get oneSnikerLoading(){
        return this._oneSnikerLoading
    }

    get oneBrandAndTypeLoading(){
        return this._oneBrandAndTypeLoading
    }

    get price(){
        return this._price
    }

    get count(){
        return this._count
    }

    get snikkersLoading(){
        return this._snikkersLoading
    }

    get basket(){
        return this._basket
    }
    get basketRef(){
        return this._basketref
    }
    get devicebrand(){
        return this._devicebrand
    }
    get devicetype(){
        return this._devicetype
    }
    get memoSnikers(){
        return this._memoSnikers
    }

    get limit(){
        return this._limit
    }
    get totalCount(){
        return this._totalCount
    }

    get page(){
        return this._page
    }


    get brand(){
        return this._brands
    }

    get activetype(){
        return this._activetype
    }

    get activesniker(){
        return this._activesniker
    }

    get activebrand(){
        return this._activebrand
    }

    get snikers(){
        return this._snikers
    }
}
