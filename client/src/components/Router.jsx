import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import {Route,Routes} from 'react-router-dom'
import { Context } from '..'
import { Admin } from '../pages/Admin'
import { Shop } from '../pages/Shop'
import { authRouts, publicRouts } from '../routs'
import { ADMIN_ROUTE } from '../utils/const'
export const Router = observer(({admin}) => {
   
    const {user} = useContext(Context)
  return (
    <Routes>
    {user.auth ? 
     authRouts.map(({path,Component}) =><Route path={path} key={path} element={<Component/>}/>)
    :
    publicRouts.map(({path,Component}) =><Route path={path} key={path} element={<Component/>}/>)
    } 
      
      
    {admin && <Route  path={ADMIN_ROUTE} element={<Admin/>}/>} 
     <Route  path='*' element={<Shop/>}/>
    </Routes>
  )
})
