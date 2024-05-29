import { IUser } from '../src/types'
import { CustomAxios } from './../axios'

export const login = async (formData: any) => {
    try {
        const request = await CustomAxios.post('/auth/login', { ...formData })
        // console.log(request)
        return request.data as IUser
    } catch (error: any) {
        const errors = error?.response?.data?.msg || 'Another server error'
        throw new Error(errors)
    }
}
export const register = async (formData: any) => {
    try {
        const request = await CustomAxios.post('/auth/signup', { ...formData })

        return request.data as IUser
    } catch (error: any) {
        console.log(error)

        const errors = error?.response?.data?.msg || 'Another server error'
        throw new Error(errors)
    }
}
export const checkAuth = async () => {
    try {
        const request = await CustomAxios.get('/users/check-auth')

        return request.data as IUser
    } catch (error: any) {
        console.log(error)

        const errors = error?.response?.data?.msg || 'Another server error'
        throw new Error(errors)
    }
}
