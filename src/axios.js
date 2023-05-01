import axios from "axios";
import Cookies from "js-cookie";


const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    withCredentials: true
})


axiosClient.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${Cookies.get("_auth")}`
    config.headers.Accept = `application/json`
    return config
})
    
export  default  axiosClient;