import { $host } from "./index";
import jwt_decode from "jwt-decode"
import axios from "axios";

export const addBasket = async (info)=>{
    const {data} =await axios.post('http://localhost:5000/api/basket',info)
    return data
}

export const getUserBasket = async(info)=>{
    try {
        const {data} =await axios.post('http://localhost:5000/api/basket/get',info)
        return data
    } catch (error) {
        
    }
  
}