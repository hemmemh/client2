import React, {useState } from 'react'
import "./spoilerType.scss"
export const SpoilerTipe = ({name,children}) => {

    const [visible, setvisible] = useState(false)
    function x(visible) {
        if (visible === true) {
            setvisible(false)
        }else{
            setvisible(true)
        }
    }
  return (
   <div  className="spoler">
    <div onClick={()=>x(visible)} className="spoler__name">{name}</div>
      <div className={visible ? "spoler__body active" : "spoler__body"}>
        {children}
      </div>
   </div>
  )
}
