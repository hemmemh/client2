import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import  './modal.scss'
export const Modal = observer( ({active,setActive,children}) => {
  return (
    <div className={active ?"modal active":"modal"} onClick={()=>setActive(false)}>
        <div className={active ?"modal__body active":"modal__body"} onClick={e=>e.stopPropagation()}>
            {children}
        </div>
    </div>
  ) 
})
