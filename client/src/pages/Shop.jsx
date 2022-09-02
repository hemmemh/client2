import React, { useContext } from 'react'
import { NavBar } from '../components/Navbar/NavBar'
import Swiper,{ Navigation, Pagination } from 'swiper';
import 'swiper/css';
import { SpoilerTipe } from '../components/spoiler/SpoilerTipe';
import {ButtonGroup, Button} from '@mui/material'
import "../styles/style.scss"
import { Item } from '../components/item/Item';
import { useEffect } from 'react';
import { getAllBrands, getAllSnikers, getAllTypes} from '../http/snikerApi';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { useState } from 'react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserBasket } from '../http/basketApi';

export const Shop = observer(() => {
    const {sniker,user} = useContext(Context)
    const [loading, setloading] = useState(false)
    const [search, setsearch] = useState('')
    const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination],
        spaceBetween: 30,
        loopedSlides: 3,
        slidesPerView: "auto",
        loop: true,
        observer:true,
        pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: '.next',
            prevEl: '.prev',
          },
      
      });
       
      const getSnikkers = async()=>{
      try {
        sniker.setSnikkersLoading(false)
        const data = await getAllSnikers(null,null,sniker.page,sniker.limit,search)
        sniker.setSnikers(data.rows)
        sniker.setTotalCount(data.count)  

      } catch (error) {
        console.log(error);
      }finally{
         sniker.setSnikkersLoading(true)
      }
      }

      const getSnikkers2 = async()=>{
        try {
          sniker.setSnikkersLoading(false)
          const data = await getAllSnikers(sniker.activetype.id,sniker.activebrand.id,sniker.page,sniker.limit,search)
          sniker.setSnikers(data.rows)
          sniker.setTotalCount(data.count)  
        } catch (error) {
          console.log(error);
        }finally{
           sniker.setSnikkersLoading(true)
        }
        }

        const getTypesAndBrands = async()=>{
            try {
              sniker.setTypesAndBrandLoading(false)
              const data = await getAllTypes()
              const data2 = await getAllBrands()
              sniker.setTypes(data)
              sniker.setBrand(data2)  
            } catch (error) {
              console.log(error);
            }finally{
               sniker.setTypesAndBrandLoading(true)
            }
            }

      useEffect(() => {
        getSnikkers2()
    }, [sniker.page,sniker.activebrand,sniker.activetype,search])
   
      useEffect(() => {
        getSnikkers()
        getTypesAndBrands()
    }, []) 
  

    
     
   
    let pages = Math.ceil(sniker.totalCount / sniker.limit ) 
    let pagesArray = []
    for (let index = 0; index < pages; index++) {
        const element = index+1;
        pagesArray.push(element)
    }
    if (sniker.snikkersLoading === false){
        return <div>Загрузка</div>
      }else{
        return (
            <div>
                 <NavBar/>
                 <div className="Shop">
                    <div className="Shop__container _container">
                        <div className="Shop__slider">
                            <div className="swiper">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="swiper-slide__info">
                                            <div className="swiper-slide__text"><span>Stan Smith</span>, Forever!</div>
                                            <button type="submit" className="swiper-slide__button">Отправить</button>
                                            
                                        </div>
                                        <div className="swiper-slide__image-cover">
                                            <div className="swiper-slide__image">
                                                <img src={require("../images/slide_1.png")} alt=""/>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="swiper-slide__info">
                                            <div className="swiper-slide__text"><span>Stan Smith</span>, Forever!</div>
                                            <button type="submit" className="swiper-slide__button">Отправить</button>
                                            
                                        </div>
                                        <div className="swiper-slide__image-cover">
                                            <div className="swiper-slide__image">
                                                <img src={require("../images/slide_1.png")} alt=""/>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="swiper-slide__info">
                                            <div className="swiper-slide__text"><span>Stan Smith</span>, Forever!</div>
                                            <button type="submit" className="swiper-slide__button">Отправить</button>
                                            
                                        </div>
                                        <div className="swiper-slide__image-cover">
                                            <div className="swiper-slide__image">
                                                <img src={require("../images/slide_1.png")} alt=""/>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                                <div className="swiper-pagination"></div>
                              
                            </div>
                            <div className="swiper-slide__arrows">
                                    <div className="prev swiper-arrow _icon-arroww"></div>
                                    <div className="next swiper-arrow _icon-arroww"></div>
                            </div>
                        </div>
                        <div className="Shop__main main-shop">
                            <div className="main-shop__actions">
                                <div className="main-shop__logo">{user.user.id}</div>
                      
                                <SpoilerTipe name={sniker.activetype.name || "Тип кросовок"}>
                                <div onClick={()=> sniker.setActiveTypes({})} className="spoler__item">отменить</div>
                                {sniker.type.map(typee => <div onClick={()=> sniker.setActiveTypes(typee)} className="spoler__item">{typee.name}</div>)}
                                </SpoilerTipe>
                                <SpoilerTipe name={sniker.activebrand.name ||"Бренд кросовок"}>
                                <div onClick={()=>sniker.setActiveBrand({})} className="spoler__item">отменить</div>
                                {sniker.brand.map(brandd => <div onClick={()=>sniker.setActiveBrand(brandd)} className="spoler__item">{brandd.name}</div>)}
                                </SpoilerTipe>
                                <div className="main-shop__input _icon-search">
                                    <input type="text" value={search} onChange={(e)=>setsearch(e.target.value)} placeholder='Поиск...' className="main-shop__search "></input>
                                </div> 
                            </div>
                            <div className="main-shop__items">
                                {  
                                sniker.snikers.map(snikerr=><Item id={snikerr.id} img={snikerr.img} name={snikerr.name}price={snikerr.price} brandId={snikerr.brandId} typeId={snikerr.typeId} />)
                                }
                            </div>
                        </div>
                        <div className="Shop__navpage">
                            <ButtonGroup>
                                {
                                 pagesArray.map(page=>
                                    <button key={page} onClick={()=>sniker.setPage(page)} className={sniker.page === page ? "pages__button active":'pages__button'}>{page}</button>
                                     )
                                 }
                            </ButtonGroup>
                        </div>
                        
                    </div>
                    
                 </div>
            </div>
           
          )
      }
 
}
)

