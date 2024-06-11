import { IMessage, IUser } from '../src/types'
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
export const getConversation = async () => {
    try {
        const request = await CustomAxios.get('/users')
        return request.data
    } catch (error: any) {
        console.log(error)

        const errors = error?.response?.data?.msg || 'Another server error'
        throw new Error(errors)
    }
}
export const sendMessage = async ({
    id,
    message,
}: {
    id: string
    message: string
}) => {
    try {
        const request = await CustomAxios.post(
            `/message/send/${id}`,
            { message },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        return request.data as IMessage
    } catch (error: any) {
        console.log(error)

        const errors = error?.response?.data?.msg || 'Another server error'
        throw new Error(errors)
    }
}

export const getMessages = async (id: string) => {
    try {
        const request = await CustomAxios.get(`/message/${id}`)
        return request.data as IMessage[]
    } catch (error: any) {
        console.log(error)

        const errors = error?.response?.data?.msg || 'Another server error'
        throw new Error(errors)
    }
}
