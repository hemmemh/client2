
import React, { useEffect } from 'react'
import "../styles/admin.scss"
import { useState } from 'react'
import { Modal } from '../components/Modal'
import { NavBar } from '../components/Navbar/NavBar'
import "../components/modals.scss"
import { useContext } from 'react'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import { addBrand, addSniker, addType, getAllBrands, getAllTypes } from '../http/snikerApi'
import { SpoilerTipe } from '../components/spoiler/SpoilerTipe'
import { getAllUsers, getOneUsers } from '../http/userApi'
import { addRoles, addRoleUserr, getAllRoles } from '../http/roleApi'
export const Admin = observer(() => {
  const {sniker} = useContext(Context)
  const {user} = useContext(Context)
  const {role} = useContext(Context)
  const [name, setname] = useState("")
  const [price, setprice] = useState(0)
  const [typeModal, settypeModal] = useState(false)
  const [brandModal, setbrandModal] = useState(false)
  const [snikerModal, setsnikerModal] = useState(false)
  const [rolerModal, setroleModal] = useState(false)
  const [addrolrModal, setaddroleModal] = useState(false)
  const [value, setvalue] = useState("")
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])
  useEffect(() => {
    getAllUsers().then(data=>user.setUsers(data))
    getAllRoles().then(data=>role.setRoles(data)) 
    getAllTypes().then(data=>sniker.setTypes(data)) 
    getAllBrands().then(data=>sniker.setBrand(data)) 
  }, [])


 
  const createTypes = ()=>{
    addType({name:value}).then(
      data=>{
        setvalue("")
        settypeModal(false)
      }
    )
    }

    const addDevice = ()=>{
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price',  `${price}`)
      formData.append('img', file)
      formData.append('brandId', sniker.activebrand.id)
      formData.append('typeId', sniker.activetype.id)
      formData.append('info', JSON.stringify(info))
      console.log();
      addSniker(formData).then(data =>setsnikerModal(false))
    }
    const  createBrands = ()=>{
      addBrand({name:value}).then(
        data=>{
          setvalue("")
          setbrandModal(false)
        }
      )
      }
      const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addInfo = () => {
      setInfo([...info,{name:'',description:'',number:Date.now()}])
  }
  const updateInfo= (key,value,number) => {
    setInfo(info.map(e=>e.number === number ? {...e,[key]:value}:e ))
 
}
    const createRole = ()=>{
      const userId = user.activeUser.id
      addRoles({name:value}).then(
        data=>{
          setvalue("")
          setaddroleModal(false)
        }
      )
      }
    const addRoleUser = ()=>{
     const userId = user.activeUser.id
     const roleId = role.activeRole.id
   
     addRoleUserr({userId:userId,roleId:roleId}).then(
        data=>{
          setvalue("")
          setroleModal(false)
        }
      )
      }


  return (
    <div>
      <NavBar/>
      <div className="admin">
        <div className="admin__conainer _container">
          <div className="admin__body">
            <button onClick={()=> settypeModal(true)} className="typeModale__button">добавить тип</button>
            <button onClick={()=> setbrandModal(true)} className="typeModale__button">добавить бренд</button>
            <button onClick={()=> setsnikerModal(true)} className="typeModale__button">добавить устройство</button>
            <button onClick={()=> setroleModal(true)} className="typeModale__button">добавить роль пользователю</button>
            <button onClick={()=> setaddroleModal(true)} className="typeModale__button">добавить роль </button>
          </div>
        </div>
      </div>
      <Modal active={typeModal} setActive={settypeModal} >
      <div className="typeModale">
          <div className="typeModale__name">Добавить тип</div>
          <input value={value} onChange={e=>setvalue(e.target.value)} className="typeModale__input" type="text" placeholder='Тип' />
          <button onClick={createTypes} type="submit" className="typeModale__button _add">добавить</button>
        </div>
      </Modal>
      <Modal active={brandModal} setActive={setbrandModal} >
      <div className="typeModale">
          <div className="typeModale__name">Добавить бренд</div>
          <input value={value} onChange={e=>setvalue(e.target.value)} className="typeModale__input" type="text" placeholder='Бренд' />
          <button onClick={createBrands} type="submit" className="typeModale__button _add">добавить</button>
        </div>
      </Modal>


      <Modal active={snikerModal} setActive={setsnikerModal} >
      <div className="typeModale">
      <div className="typeModale__name">Добавить товар</div>

      <input value={name} onChange={e=>setname(e.target.value)} className="typeModale__input" type="text" placeholder='Имя' />
      <input value={price} onChange={e=>setprice(Number(e.target.value))} className="typeModale__input" type="text" placeholder='Цена' />
       <div className="spoler__container">
       <SpoilerTipe className="admin__spoiler"   name={sniker.activebrand.name ||'выбрать бренд'}>
        {sniker.brand.map(brandd => <div key={brandd.name} onClick={()=>sniker.setActiveBrand(brandd)} className="spoler__item">{brandd.name}</div>)}
      </SpoilerTipe>

      <SpoilerTipe className="admin__spoiler"   name={sniker.activetype.name ||'выбрать тип'}>
        {sniker.type.map(typee => <div key={typee.name} onClick={()=>sniker.setActiveTypes(typee)} className="spoler__item">{typee.name}</div>)}
      </SpoilerTipe>

       </div>
      
      <input type="file"   onChange={selectFile}/>
      
      <button onClick={addInfo} type="submit" className="typeModale__button _add">добавить свойство</button>
       
       {info.map(e=>
       <div key={e.number} className='admin__info'>
        <input value={e.name} onChange={i=>updateInfo('name',i.target.value,e.number)} className="typeModale__input" type="text" placeholder='Имя' />
        <input value={e.description} onChange={i=>updateInfo('description',i.target.value,e.number)} className="typeModale__input" type="text" placeholder='описание' />
       </div>
       )}

<button onClick={addDevice} type="submit" className="typeModale__button _add">добавить устройство</button>
      </div>
      </Modal>


      <Modal active={rolerModal} setActive={setroleModal} >
      <div className="typeModale">
        <SpoilerTipe className="admin__spoiler"   name={user.activeUser.email ||'выбрать пользователя'}>
        {user.users.map(userr => <div key={userr.email} onClick={()=>user.setactiveUser(userr)} className="spoler__item">{userr.email}</div>)}
        </SpoilerTipe>
        <SpoilerTipe className="admin__spoiler"   name={role.activeRole.name || 'выбрать роль'}>
        {role.roles.map(rolee => <div key={rolee.name} onClick={()=>role.setactiveRole(rolee)} className="spoler__item">{rolee.name}</div>)}
        </SpoilerTipe>
        <button onClick={addRoleUser} type="submit" className="typeModale__button _add">добавить</button>
        </div>
      </Modal>
      <Modal active={addrolrModal} setActive={setaddroleModal} >
      <div className="typeModale">
        <input  value={value} onChange={e=>setvalue(e.target.value)} className="typeModale__input" type="text" placeholder='Роль' />
        <button onClick={createRole} type="submit" className="typeModale__button _add">добавить</button>
        </div>
      </Modal>
    </div>
  )
})
