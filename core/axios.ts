import axios from "axios";
import { parseCookies } from 'nookies'

const  $api =  axios.create({
    baseURL: 'http://localhost:7777',
})

$api.interceptors.request.use((config) => {

    if (typeof window !== 'undefined') {
        const { _token } = parseCookies();
        config.headers.Authorization = `Bearer ${_token}`
    }
    return config
})

export default $api