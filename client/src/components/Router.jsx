import React from 'react'
import {Route,Routes} from 'react-router-dom'
import { Shop } from '../pages/Shop'
import { authRouts, publicRouts } from '../routs'
export const Router = () => {
    const Auth = true
  return (
    <Routes>
    {Auth ? 
     authRouts.map(({path,Component}) =><Route path={path} key={path} element={<Component/>}/>)
    :
    publicRouts.map(({path,Component}) =><Route path={path} key={path} element={<Component/>}/>)
    } 
     <Route  path='*' element={<Shop/>}/>
    </Routes>
  )
}
