import { CustomAxios } from './../axios'

export const login = async (formData: FormData) => {
    try {
        const request = await CustomAxios.post('/auth/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        console.log(request)
        return request
    } catch (error: any) {
        const errors = error?.response?.data?.msg || 'Another server error'
        throw new Error(errors)
    }
}
export const register = async (formData: any) => {
    try {
        const request = await CustomAxios.post('/auth/signup', { ...formData })

        return request.data
    } catch (error: any) {
        console.log(error)

        const errors = error?.response?.data?.msg || 'Another server error'
        throw new Error(errors)
    }
}
