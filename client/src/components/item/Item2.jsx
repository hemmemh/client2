import { observer } from 'mobx-react-lite'
import React, { useContext, useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { A11y } from 'swiper'
import { Context } from '../..'
import { getUserBasket } from '../../http/basketApi'
import { getBasket, getOneSnikers } from '../../http/snikerApi'
import { DEVICE_ROUTE } from '../../utils/const'
import "./item.scss"
export const Item2 = observer( ({ id, img ,name, price}) => {
    const {sniker,user} = useContext(Context)
    const navigate = useNavigate()
    const removeItem = ()=>{
        const index = sniker.basket.findIndex((el)=>el.id === id)
        console.log(index);
        let newBaket = [...sniker.basket]
        if (index>=0) {
            newBaket.splice(index,1)
        }
        console.log(newBaket);
        sniker.setBasket(newBaket)
        sniker.setCount(sniker.count - 1)
        sniker.setPrice(sniker.price - price)
      
    }
  console.log( sniker.basket);
  return (
    <div onClick={()=>navigate(DEVICE_ROUTE + '/'+ id)} key={id} className="item">
       <div className="item__body body-item">
           <div className="item__left">
           <div className="item__image">  
               <img src={process.env.REACT_APP_API_URL + img} alt=""/>
           </div>
           <div className="item__logo">
                   <div className="item__name">{name}</div>
           </div>
           <div className="item__actions">
               <div className="item__cost cost-item">
                   <div className="cost-item__name">Цена:</div>
                   <div className="cost-item__value">{price}</div> 
               </div>
           </div>
           </div>
           <div className="item__right"><button type="submit" onClick={()=>removeItem()} className ="swiper-slide__button">удалить</button></div>
       </div>
       </div>

 
 ) 
})
