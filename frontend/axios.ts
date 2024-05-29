import axios from 'axios'

export const CustomAxios = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
})
