import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context } from '../..'
import { addBasket } from '../../http/basketApi'
import { getOneBrand, getOneSnikers, getOneType } from '../../http/snikerApi'
import { DEVICE_ROUTE } from '../../utils/const'
import "./item.scss"
export const Item = observer( ({id,img,name,price,brandId,typeId}) => {  
    console.log(id); 
    const [add, setAdd] = useState(false)
    
    const addBaskett = async (name,price,img,id,brandd,typee)=>{
        const brand = await getOneBrand({idBrand:brandd})
        const type =  await getOneType({idType:typee})
        sniker.setBasket([...sniker.basket,{name,price,img,id,type,brand}])
        localStorage.setItem('basket',JSON.stringify(sniker.basket))

    }
   
    const navigate = useNavigate()
    const {sniker,user} = useContext(Context)

    useEffect(() => {
        if(sniker.basket.find(item=>item.id === id)){
            setAdd(true)
        }
    }, [])
    
    useEffect(() => {
        if(user.auth === false){
            setAdd(false)
        }
    }, [user.auth])
    
  return (
<div key={id} onClick={()=>{
    !add ?
    navigate(DEVICE_ROUTE + '/'+ id,)
    :
    navigate(DEVICE_ROUTE + '/'+ id + '?sort=date',)
    }} className="item">
            <div className="item__body">
                <div className="item__image">  
                
     
                    <img src={process.env.REACT_APP_API_URL  + img} alt=""/>
                </div>
                <div className="item__logo">
                        <div className="item__type"></div>
                        <div className="item__name">{name}</div>
                </div>
                <div className="item__actions">
                    <div className="item__cost cost-item">
                        <div className="cost-item__name">Цена:</div>
                        <div className="cost-item__value">{price}</div> 
                    </div>
                    <div onClick={e=>{
                         e.stopPropagation()
                         if(!add && user.auth) {
                        addBaskett(name,price,img,id,brandId,typeId)
                        setAdd(true)
                        sniker.setCount(sniker.count + 1)
                        sniker.setPrice(sniker.price + price)
                        localStorage.setItem('count',JSON.stringify(sniker.count))
                        localStorage.setItem('price',JSON.stringify(sniker.price))
                        setAdd(true)
                         }  
                        }
                       
                        } className={add ? "cost-item__add _icon-check":"cost-item__add _icon-plus "}></div>
                </div>
            </div>
        </div>)
        
})
