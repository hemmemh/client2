import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Context } from ".";
import { Router } from "./components/Router";
import { getAllBrands, getAllTypes, getBasket } from "./http/snikerApi";
import "./styles/app.scss"
import jwt_decode from "jwt-decode"
import Cookies from 'js-cookie';
import { check } from "./http/userApi";
import { getUserBasket } from "./http/basketApi";
function App() {
  const location = useLocation()
  const {sniker,user} = useContext(Context)
useEffect(() => {
  if (Cookies.get('userToken')) {
    user.setUser(jwt_decode(Cookies.get('userToken')))
    user.setAuth(true)
    sniker.setCount(sniker.count )
    sniker.setPrice(sniker.price)
  }
  if(localStorage.getItem('basket') != null){
    sniker.setBasket(JSON.parse(localStorage.getItem('basket')))
  }
  if(localStorage.getItem('count') != null){
    sniker.setCount(JSON.parse(localStorage.getItem('count')))
  }
  if(localStorage.getItem('price') != null){
    sniker.setPrice(JSON.parse(localStorage.getItem('price')))
  }
 
 
}, [])




  
  return (
    <div className="App">
     <Router/>
    </div>
  );
}

export default App;
