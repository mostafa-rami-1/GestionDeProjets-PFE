import axios from "axios";
import Cookies from "js-cookie";


const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true
})


axiosClient.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${Cookies.get("_auth")}`
    config.headers.Accept = `application/json`
    return config
})
    
export  default  axiosClient;