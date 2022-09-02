import axios from "axios"
import Cookies from 'js-cookie';
const $host = axios.create({
    baseURL:process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
})


$authHost.interceptors.request.use(request=>{
    request.headers.authorization = `Bearer ${Cookies.get('userToken')}`
    return request
})

export {
    $host,
    $authHost
}