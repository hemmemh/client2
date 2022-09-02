import Cookies from 'js-cookie'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../..'
import { getUserBasket } from '../../http/basketApi'


import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../../utils/const'
import "./navbar.scss"
export const NavBar = observer( () => {
  const {user,sniker}= useContext(Context)
  const [admin, setadmin] = useState(false)
  const navigate = useNavigate()
  const logOut = async()=>{
    user.setUser({})
    user.setAuth(false)
    const data = Cookies.remove('userToken')
    localStorage.removeItem('basket')
    localStorage.removeItem('price')
    localStorage.removeItem('count')
    sniker.setBasket([])
    sniker.setPrice(0)
    sniker.setCount(0)
    return data
  }
  useEffect(() => {
   if (user.auth) {
    if(user.user.role.find(item=>item.name === 'ADMIN')) {
      setadmin(true)
   }
  }
    
  }, [user.auth])
  
  
  
  return (
    <div className="Navbar">
      <div className="Navbar__container _container">
        <div onClick={()=>navigate(SHOP_ROUTE)} className="Navbar__logo logo-navbar">
          <div className="logo-navbar__image">
            <img src={require("../../images/logo.png")} alt=""/>
          </div>
          <div className="logo-navbar__name">
            <div className="logo-navbar__name-top">REACT SNEAKERS</div>
            <div className="logo-navbar__name-bottom">Магазин лучших кроссовок</div>
          </div>
        </div>
        {user.auth ?
        <div className="Navbar__action action-navbar">
          
          <div onClick={()=>{
            navigate(BASKET_ROUTE)  
          }
            } className="action-navbar__store _icon-cart">{sniker.price}<span>{sniker.count}</span></div>
          <div onClick={logOut} className="action-navbar__user _icon-user">выйти</div>
          {admin && <div onClick={()=>navigate(ADMIN_ROUTE)} className="action-navbar__user ">АДМИН</div>}
        </div>
        :
        <div className="Navbar__action action-navbar">
        <div onClick={()=> navigate(BASKET_ROUTE)}className="action-navbar__store _icon-cart">0</div>
        <div onClick={()=>navigate(LOGIN_ROUTE)} className="action-navbar__user _icon-user">войти
        </div>
      </div>
      }
      </div>
    </div>
  )
})
