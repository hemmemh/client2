import { useContext, useEffect, useState } from "react";
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
  const [admin, setAdmin] = useState(false)
  const getcheck = async(a1)=>{
    const res =await check({userToken:a1})
    return res
  }
useEffect(() => {
  if (Cookies.get('userToken')) {
    const a1 = Cookies.get('userToken')
    console.log('sdass');
    user.setUser(jwt_decode(Cookies.get('userToken')))
    console.log(user.user);
    user.setAuth(true)
    sniker.setCount(sniker.count )
    sniker.setPrice(sniker.price)
    if (user.user.role.find(el=>el.name === "ADMIN")) {
      console.log('sss');
      setAdmin(true)
    }
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
     <Router admin={admin}/>
    </div>
  );
}

export default App;
