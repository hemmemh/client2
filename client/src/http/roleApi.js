import { $host } from "./index";
import jwt_decode from "jwt-decode"
import axios from "axios";


export const addRoles = async (info)=>{
    const {data} =await axios.post('http://localhost:5000/api/role',info)
    return data
}

export const addRoleUserr = async (info)=>{
    const {data} =await axios.post('http://localhost:5000/api/role/setRole',info)
    return data
}

export const getAllRoles = async (info)=>{
    const {data} =await axios.get('http://localhost:5000/api/role',info)
    return data
}