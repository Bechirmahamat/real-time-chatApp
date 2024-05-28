import { ChangeEvent, useState } from 'react'
import { Form, Link } from 'react-router-dom'
import { z } from 'zod'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'

import { login } from './../../hooks/api'
import toast from 'react-hot-toast'

const loginSchema = z.object({
    username: z
        .string()
        .min(4, 'Username is required and must be greater than 4 characters'),
    password: z
        .string()
        .min(4, 'Password is required and must be greater than 4 characters'),
})

const Login = () => {
    const [values, setValues] = useState<{
        username: string
        password: string
    }>({
        username: '',
        password: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<{
        username?: string
        password?: string
    }>({})

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues((prevValues) => ({ ...prevValues, [name]: value }))

        if (name === 'username' && value.length > 3 && errors.username) {
            setErrors((prevErrors) => ({ ...prevErrors, username: '' }))
        }
        if (name === 'password' && value.length > 3 && errors.password) {
            setErrors((prevErrors) => ({ ...prevErrors, password: '' }))
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const validation = loginSchema.safeParse(values)
        if (!validation.success) {
            const formErrors: { username?: string; password?: string } = {}
            validation.error.errors.forEach((error) => {
                if (error.path[0] === 'username') {
                    formErrors.username = error.message
                }
                if (error.path[0] === 'password') {
                    formErrors.password = error.message
                }
            })
            setErrors(formErrors)
            setIsSubmitting(false)
            return
        }

        const formData = new FormData()
        formData.append('username', values.username)
        formData.append('password', values.password)

        try {
            const data = await login(formData)
            console.log(data)
            // Handle successful login
        } catch (error: any) {
            toast.error(error?.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='flex-1 w-full flex justify-center items-center min-h-screen'>
            <Form
                onSubmit={onSubmit}
                className='w-10/12 shadow-md sm:max-w-[420px] mx-auto border-1 border flex flex-col gap-y-3 rounded-xl p-6 border-neutral'
            >
                <h4 className='text-center mb-4 font-semibold tracking-wider text-lg'>
                    Login
                </h4>
                <FormInput
                    name='username'
                    type='text'
                    error={errors.username}
                    value={values.username}
                    placeHolder='Enter your username'
                    onChange={onChange}
                    containerStyle=''
                    inputStyle=''
                />
                <FormInput
                    name='password'
                    type='password'
                    error={errors.password}
                    value={values.password}
                    placeHolder='Enter your password'
                    onChange={onChange}
                    containerStyle=''
                    inputStyle=''
                />
                <p className='ml-auto cursor-pointer hover:underline'>
                    forget password
                </p>
                <FormButton
                    type='submit'
                    text='Login'
                    styles='w-full mt-4'
                    isLoading={isSubmitting}
                />
                <Link
                    to='/sign-up'
                    className='mx-auto cursor-pointer hover:underline'
                >
                    Don't have an account yet?{' '}
                    <span className='text-secondary'>Sign-up</span>
                </Link>
            </Form>
        </div>
    )
}

export default Login
