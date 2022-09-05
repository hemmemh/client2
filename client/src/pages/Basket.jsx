import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Context } from '..'
import { Item2 } from '../components/item/Item2'
import { NavBar } from '../components/Navbar/NavBar'
import { getBasket } from '../http/snikerApi'

export const Basket = observer(() => {
  const {sniker,user} = useContext(Context)
  const location = useLocation()
   let bask = sniker.basket 

 
  return (
    <div>
      <NavBar/>
      <div className="Basket">
        <div className="Basket__container">
          <div className="Basket__items">
           {
           sniker.basket.map((a,c)=><Item2 id={a.id} img={a.img} name={a.name} price={a.price} count={a.count} index={c} />)}
          </div>
        </div>
      </div>
      </div>
  )
})
