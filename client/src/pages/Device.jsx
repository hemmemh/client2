import React, { useState } from 'react'
import {Stack,Rating} from '@mui/material';
import { NavBar } from '../components/Navbar/NavBar'

import "../styles/device.scss"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { getAllBrands, getAllTypes, getOneBrand, getOneSnikers, getOneType, setRating } from '../http/snikerApi';
import { observer } from 'mobx-react-lite';
import { getOneUsers, getOneUsers2 } from '../http/userApi';
import Cookies from 'js-cookie';
import { LOGIN_ROUTE } from '../utils/const';
import jwtDecode from 'jwt-decode';
export const Device = observer(() => {
  const {sniker,user} = useContext(Context)
  const [device, setDevice] = useState({})
  const [add, setadd] = useState(false)
  const [loading, setloading] = useState(false)
  const [loading2, setloading2] = useState(false)
  const [loading3, setloading3] = useState(false)
  const [type, settype] = useState('')
  const [bs, setbs] = useState([])
  const [value, setvalue] = useState(0)
  const [a2, seta2] = useState(0)
  const [count, setCount] = useState(1)
  const [a3, seta3] = useState(0)
  const [a4, seta4] = useState(false)
  const [brand, setbrand] = useState('')
  const [brand2, setbrand2] = useState("")
  const [hover, sethover] = useState(null)
  const [rate, setRate] = useState(false)
  const [userRating, setUserRating] = useState({})
  const {id} = useParams()
  const navigate = useNavigate()
  let a =''
  let c4 = false
  const [useparams,setparams] = useSearchParams()
 
  const getSnikker = async()=>{
    try {
      setloading3(false)
      const el =await getOneSnikers(id)
      setDevice(el)
      seta2(el.rating.rate) 
      seta3(el.rating.rating /el.rating.rate) 
      setUserRating(user.user.rating)
      
      setloading3(true)
      
     
    } catch (error) {
      console.log(error.message);
    }finally{
      console.log(11);
   
    }
   
  }
  const getOneBrandAndType = async()=>{
    try {
      sniker.setOneBrandAndTypeLoading(false)
      const data1 =await getOneBrand({idBrand:device.brandId})
      const data2 =await getOneType({idType:device.typeId})
      
    } catch (error) {
      console.log(error);
    }finally{
      sniker.setOneBrandAndTypeLoading(true)
    }
  }
  useEffect(() => {
    
    setloading(false)
    if(user.auth){
      if(user.user.rating.find(it=>it.snickerId === id)){
          setRate(true)
      }
  }
    console.log(user.user);
    getSnikker()
    if(localStorage.getItem('basket') != null){
      sniker.setBasket(JSON.parse(localStorage.getItem('basket')))
    }
    
    if(useparams.has('sort')){
        setadd(true)
    }
    
    if(useparams.has('sort2')){
      setRate(true)
  }

  setloading(true)
  }, [])
 
  useEffect(() => {
    setloading2(false)
    console.log(device);
  
    if (localStorage.getItem('basket') !== null) {
      const al = JSON.parse(localStorage.getItem('basket')) 
    if (al.find(el=>el.id === device.id)) {
      console.log('sdsd');
      setadd(true)
    }
    }
    setloading2(true)
  }, [device])



const addRating =async (value)=>{
    c4 = true
    seta4(true)
    setvalue(value)
    const response = await setRating({snickerId:device.id,userId:user.user.id,rating:value})
    console.log(id);
    setRate(true)
    const response2= await getOneUsers2({userId:user.user.id})
    Cookies.set('userToken',response2.token)
    user.setUser(jwtDecode((Cookies.get('userToken'))))
    console.log(user.user);
}




const addBaskett = async (name,price,img,id,brandd,typee,count)=>{
  console.log(brandd,typee,name,price,img,id,count);
  const brand = await getOneBrand({idBrand:brandd})
  const type =  await getOneType({idType:typee})

  sniker.setBasket([...sniker.basket,{name,price,img,id,type,brand,count}])
  
  localStorage.setItem('basket',JSON.stringify(sniker.basket))

}

   if (!loading3 || !loading2 || !loading) {
    return <div>Загрузка</div>
   }
    return (
      <div>
        <NavBar/>
        <div className="device">
          <div className="device__container _container">
            <div className="device__body body-device">
              <div className="body-device__image">
              <img src={process.env.REACT_APP_API_URL + device.img} alt=""/>
              </div>
              <div className="body-device__actions">
                <div className="body-device__item">{device.name}</div>
                <div className="body-device__item">{device.type.name}</div>
                <div className="body-device__rating">{device.brand.name}</div>
                <Rating
                    name="hover-feedback"
                    value={
                          a4 === false?
                          a3  :
                          value
                             
                    }
                    disabled={rate  || !user.auth ? true : false}
                    precision={1}
                    onChange={(event, newValue) => {
                      addRating(newValue)
                    }}
                    onChangeActive={(event, newHover) => {
                      sethover(newHover);
                    }}
                  />
                  <div className="body-device__counter counter-deviceBody">
                    <div className="counter-deviceBody__count">{count}</div>
                    <div className="counter-deviceBody__actions">
                      <div onClick={()=>setCount(count + 1)} className="counter-deviceBody__inc _icon-arroww"></div>
                      <div onClick={()=>{if (count>=2) {
                        setCount(count - 1)
                      } }} className="counter-deviceBody__inc _min _icon-arroww"></div>
                    </div>
                    
                  </div>
                <button 
                onClick={()=>{
                  if (user.auth) {
                    if (!add) {
                      addBaskett(device.name,device.price,device.img,device.id,device.brand.id,device.type.id,count)
                      sniker.setCount(sniker.count + 1)
                      sniker.setPrice(sniker.price + device.price)
                      localStorage.setItem('count',JSON.stringify(sniker.count))
                      localStorage.setItem('price',JSON.stringify(sniker.price))
                    }
                  }else{
                    navigate(LOGIN_ROUTE + '/')
                  }
                  
                
                  setadd(true)
                  }}  type="submit" className="swiper-slide__button">{!add ? "в Корзину" : "в Корзине"}</button>
              </div>
            </div>
            <div className="body-device__info">
            <div className="body-device__info__logo">характеристика</div>
             {device.info && device.info.map(info=><div className="body-device__info-item">{info.name}:{info.description}</div>)} 
            </div>
          </div>
        </div>
      </div>
    )
  
  
})
