import { ACCESS_TOKEN } from "./constants";
import axios from 'axios'


export const api = axios.create({
    baseURL: "http://localhost:8000/" //import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)