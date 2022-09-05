import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode"
import axios from "axios";
import Cookies from "js-cookie";

   export const registration = async (email,password)=>{
        const {data} =await axios.post('http://localhost:5000/api/user/registration',{email,password})
        localStorage.setItem('Token',data.token)
        return jwt_decode(data.token)
    }

    export const login = async(email,password)=>{
        const {data} =await $host.post('http://localhost:5000/api/user/login',{email,password})
        return data.token
    }



    export const getAllUsers = async ()=>{
        const {data} =await axios.get('http://localhost:5000/api/user/getAll')
        return data
    }
    
    export const getOneUsers = async (info)=>{
        const {data} =await axios.post('http://localhost:5000/api/user/getOne',info)
        return data
    }

    export const getOneUsers2 = async (info)=>{
        const {data} =await axios.post('http://localhost:5000/api/user/getOne2',info)
        return data
    }


    export const check = async (userToken)=>{
        const {data} =await axios.post('http://localhost:5000/api/user',userToken)
        return data
    }


    
