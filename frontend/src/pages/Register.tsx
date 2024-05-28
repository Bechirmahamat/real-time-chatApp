import { ChangeEvent, useState } from 'react'
import { Form, Link } from 'react-router-dom'
import { z } from 'zod'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'

import { register } from './../../hooks/api'
import toast from 'react-hot-toast'

const registerSchema = z.object({
    username: z
        .string()
        .min(4, 'Username is required and must be greater than 4 characters'),
    fullName: z
        .string()
        .min(4, 'FullName is required and must be greater than 4 characters'),
    gender: z.string().min(4, 'Gender must be selected'),

    password: z
        .string()
        .min(4, 'Password is required and must be greater than 4 characters'),
})

const Register = () => {
    const [values, setValues] = useState<{
        username: string
        password: string
        fullName: string
        gender: 'male' | 'female'
    }>({
        username: '',
        password: '',
        fullName: '',
        gender: 'male',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<{
        username?: string
        password?: string
        fullName?: string
        gender?: string
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
        if (name === 'password' && value.length > 3 && errors.password) {
            setErrors((prevErrors) => ({ ...prevErrors, password: '' }))
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const validation = registerSchema.safeParse(values)
        if (!validation.success) {
            const formErrors: {
                username?: string
                password?: string
                fullName?: string
                gender?: string
            } = {}
            validation.error.errors.forEach((error) => {
                if (error.path[0] === 'username') {
                    formErrors.username = error.message
                }
                if (error.path[0] === 'password') {
                    formErrors.password = error.message
                }
                if (error.path[0] === 'fullName') {
                    formErrors.fullName = error.message
                }
                if (error.path[0] === 'gender') {
                    formErrors.gender = error.message
                }
            })
            setErrors(formErrors)
            setIsSubmitting(false)
            return
        }

        try {
            const data = await register(values)
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
                    name='fullName'
                    type='text'
                    error={errors.fullName}
                    value={values.fullName}
                    placeHolder='Enter your full name'
                    onChange={onChange}
                    containerStyle=''
                    inputStyle=''
                />
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
                <div
                    className='flex flex-col gap-y-1
'
                >
                    <p>Gender</p>
                    <select
                        className='select select-bordered w-full '
                        value={values.gender} // Set the value to the state value
                        onChange={(e) => {
                            setValues({
                                ...values,
                                gender: e.target.value as 'male' | 'female',
                            })
                        }}
                    >
                        <option value='female'>Female</option>
                        <option value='male'>Male</option>
                    </select>
                </div>
                <FormButton
                    type='submit'
                    text='Register'
                    styles='w-full mt-4'
                    isLoading={isSubmitting}
                />
                <Link
                    to='/login'
                    className='mx-auto cursor-pointer hover:underline'
                >
                    Have Account Already?
                    <span className='text-secondary'>login</span>
                </Link>
            </Form>
        </div>
    )
}

export default Register
