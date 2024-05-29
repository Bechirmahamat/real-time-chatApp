import React from 'react'
import { useGlobalContext } from '../GlobalContext'
import { Navigate, redirect } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLogged, loading } = useGlobalContext()
    if (loading) {
        return (
            <div className='w-full h-40 flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        )
    }
    if (!isLogged) {
        // toast.error('You need to login')
        return <Navigate to={'/login'} />
    } else return children
}
export default ProtectedRoute
