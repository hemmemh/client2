import React, { useState } from 'react'
import {Stack,Rating} from '@mui/material';
import { NavBar } from '../components/Navbar/NavBar'

import "../styles/device.scss"
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { getAllBrands, getAllTypes, getOneBrand, getOneSnikers, getOneType, setRating } from '../http/snikerApi';
import { observer } from 'mobx-react-lite';
import { getOneUsers } from '../http/userApi';
export const Device = observer(() => {
  const {sniker,user} = useContext(Context)
  const [device, setDevice] = useState({})
  const [add, setadd] = useState(false)
  const [type, settype] = useState({})
  const [bs, setbs] = useState([])
  const [value, setvalue] = useState(0)
  const [a2, seta2] = useState(0)
  const [a3, seta3] = useState(0)
  const [a4, seta4] = useState(false)
  const [brand, setbrand] = useState({})
  const [hover, sethover] = useState(null)
  const {id} = useParams()
  let c4 = false
  const [useparams,setparams] = useSearchParams()
 
  const getSnikker = async()=>{
    try {
      sniker.setOneSnikerLoading(false)
      const sn =  await getOneSnikers(id)
      setDevice(sn)
      
      seta2(sn.rating.rate) 
      seta3(sn.rating.rating /sn.rating.rate) 
    } catch (error) {
      console.log(error);
    }finally{
      console.log(11);
      sniker.setOneSnikerLoading(true)
    }
   
  }
  const getOneBrandAndType = async()=>{
    try {
      sniker.setOneBrandAndTypeLoading(false)
      const data1 =await getOneBrand({idBrand:device.brandId})
      const data2 =await getOneType({idType:device.typeId})
      setbrand(data1)
      settype(data2)
    } catch (error) {
      console.log(error);
    }finally{
      sniker.setOneBrandAndTypeLoading(true)
    }
  }
  useEffect(() => {
    getSnikker()
    getOneBrandAndType()
    if(localStorage.getItem('basket') != null){
      sniker.setBasket(JSON.parse(localStorage.getItem('basket')))
    }
    
    if(useparams.has('sort')){
        setadd(true)
    }
    
  }, [])
 
  useEffect(() => {
    getOneBrandAndType()
    
  }, [device])



const addRating =async (value)=>{

    c4 = true
    seta4(true)
    setvalue(value)
    console.log(value);
    await setRating({snickerId:device.id,userId:user.user.id,rating:value})
    console.log('111');
  
  
}

const addBaskett = async (name,price,img,id,brandd,typee)=>{
  const brand = await getOneBrand({idBrand:brandd})
  const type =  await getOneType({idType:typee})
  sniker.setBasket([...sniker.basket,{name,price,img,id,type,brand}])
  localStorage.setItem('basket',JSON.stringify(sniker.basket))

}
console.log(device);
  if (sniker.oneSnikerLoading === false && sniker.oneBrandAndTypeLoading === false){
    return <div>Зашрузка</div>
  }else{
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
                <div className="body-device__item">{brand.name}</div>
                <div className="body-device__item">{type.name}</div>

                <div className="body-device__rating"></div>
                <Rating
                    name="hover-feedback"
                    value={
                          a4 === false?
                          a3  :
                          value
                             
                    }
                    
                    precision={1}
                    onChange={(event, newValue) => {
                      addRating(newValue)
                    }}
                    onChangeActive={(event, newHover) => {
                      sethover(newHover);
                    }}
                  />
  
                <button onClick={()=>{
                  if (!add) {
                    addBaskett(device.name,device.price,device.img,device.id,brand.id,type.id)
                    sniker.setCount(sniker.count + 1)
                    sniker.setPrice(sniker.price + device.price)
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
  }
  
})
