import React, { useContext, useState } from 'react'
import '../styles/style.scss';
import {useLocation,Link, useNavigate, useSearchParams} from 'react-router-dom'
import { NavBar } from '../components/Navbar/NavBar'
import { DEVICE_ROUTE, LOGIN_ROUTE, REGISTRARTION_ROUTE, SHOP_ROUTE } from '../utils/const'

import { login,registration } from '../http/userApi';
import jwt_decode from "jwt-decode"
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import Cookies from 'js-cookie';
import { getUserBasket } from '../http/basketApi';
export const Auth = observer( () => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const loaction = useLocation()
    const isAuth = loaction.pathname === LOGIN_ROUTE
    const [email, setemail] = useState('')
    const [loading, setloading] = useState(true)
    const [password, setpasswordl] = useState('')
    const [useparams,setparams] = useSearchParams()
    const onClick =async ()=>{
        try {
            let data
            if (isAuth) {
                 data =await login(email,password)
                 console.log(data);
                 Cookies.set('userToken',data)
                 user.setUser(jwt_decode(Cookies.get('userToken')))
                 user.setAuth(true)
                 console.log(user.user);
                 navigate(SHOP_ROUTE)
            
                 
                 
             }else{
                 navigate(SHOP_ROUTE)
                 data =await registration(email,password)
                 
                    
                 
              
             }
        } catch (error) {
            alert(error.response.data.message)
        }
       
    }

  return (
    <div>
        <NavBar/>
        <div className="Auth">
        <div className="Auth__container _container">
            <div className="Auth__body body-auth">
                <div className="body-auth__logo">Авторизация</div>
                <input  value={email}    onChange={e=>setemail(e.target.value)} type="text" placeholder='email' className="body-auth__input" />
                <input  value={password} onChange={e=>setpasswordl(e.target.value)} type="password" placeholder='password' className="body-auth__input"/>
                <button onClick={onClick}  type="submit" className="body-auth__button" >{isAuth ? 'Войти' : "Зарегистрироваться"}</button>
                {isAuth 
                ?
                 <div className="body-auth__info">
                    <div className="body-auth__text">нет акканта </div>
                     <Link className="body-auth__link"  to={REGISTRARTION_ROUTE}>Зарегистрироваться</Link>
                </div> 
                : 
                 <div className="body-auth__info">
                    <div className="body-auth__text">есть аккаунт </div>         
                    <Link className="body-auth__link"  to={LOGIN_ROUTE}>Войти</Link>
                </div> 
                }
                
                
            </div>
        </div>
        </div>
    </div>
    
  )
})
