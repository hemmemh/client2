import { $authHost } from "./index";
import jwt_decode from "jwt-decode"
import axios from "axios";


   export const getAllTypes = async ()=>{
        const {data} =await axios.get('http://localhost:5000/api/type')
        return data
    }

    export const getAllBrands = async ()=>{
        const {data} =await axios.get('http://localhost:5000/api/brand')
        return data
    }

    export const getOneType = async (info)=>{
        try {
            const {data} =await axios.post('http://localhost:5000/api/type/getOne',info)
            return data
        } catch (error) {
            console.log(error);
        }
      
    }

    export const getOneBrand = async (info)=>{
        try {
            const {data} =await axios.post('http://localhost:5000/api/brand/getOne',info)
            return data
        } catch (error) {
            console.log(error);
        }
       
    }

    export const addType = async (name)=>{
        console.log(name);
        const {data} =await $authHost.post('http://localhost:5000/api/type',name)
        return data
    }

    export const addBrand = async (name)=>{
        const {data} =await $authHost.post('http://localhost:5000/api/brand',name)
        return data
    }

    export const addSniker = async (Sniker)=>{
        const {data} =await axios.post('http://localhost:5000/api/snikers',Sniker)
        return data
    }

    export const getAllSnikers = async (typeId,brandId,page,limit,search)=>{
        const {data} =await axios.get('http://localhost:5000/api/snikers',{params:{
            typeId,brandId,page,limit,search
        }})
        return data  
    }
   
    export const getOneSnikers = async (id)=>{
        try {
            const {data} =await axios.get('http://localhost:5000/api/snikers/'+id)
            return data
        } catch (error) {
            
        }
      
    }

    export const setRating = async (info)=>{
        const {data} =await axios.post('http://localhost:5000/api/rating',info)
        return data
    }
   

 

  


