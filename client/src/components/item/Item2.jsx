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
export const Item2 = observer( ({ id, img ,name, price,count}) => {
    const {sniker,user} = useContext(Context)
    const navigate = useNavigate()
    const [add, setAdd] = useState(false)
    const [rate, setRate] = useState(false)
    const removeItem = ()=>{
        const index = sniker.basket.findIndex((el)=>el.id === id)
        console.log(index);
        let newBaket = [...sniker.basket]
        if (index>=0) {
            newBaket.splice(index,1)
        }
        console.log(newBaket);
        sniker.setBasket(newBaket)
        localStorage.setItem('basket',JSON.stringify(sniker.basket))
        sniker.setCount(sniker.count - 1)
        sniker.setPrice(sniker.price - price)
        localStorage.setItem('count',JSON.stringify(sniker.count))
        localStorage.setItem('price',JSON.stringify(sniker.price))
    }
    const checkRateAndShop = ()=>{
        if (!add && !rate) {
            navigate(DEVICE_ROUTE + '/'+ id,)
        }else if(add && !rate){
            navigate(DEVICE_ROUTE + '/'+ id + '?sort=date',)
        }else if(!add && rate){
            navigate(DEVICE_ROUTE + '/'+ id + '?sort2=date2',)
        }else if(add && rate){
            navigate(DEVICE_ROUTE + '/'+ id + '?sort2=date2&sort=date',)
        }
       }
    useEffect(() => {
        if(sniker.basket.find(item=>item.id === id)){
            setAdd(true)
        }
        //if(user.auth){
        //    if(user.user.rating.find(it=>it.snickerId === id)){
        //        setRate(true)
        //    }
        //}
    }, [])
    
  console.log( sniker.basket);
  return (
    <div onClick={
        checkRateAndShop
    } key={id} className="item">
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
                   <div className="cost-item__count">Количество: {count}</div> 
               </div>
           </div>
           </div>
           <div className="item__right"><button type="submit" onClick={(e)=>{
            e.stopPropagation()
            removeItem()
            }} className ="swiper-slide__button">удалить</button></div>
       </div>
       </div>

 
 ) 
})
