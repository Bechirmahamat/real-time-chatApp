import { createContext, useContext, useEffect, useState } from 'react'
import { IUser } from './types'
import { checkAuth } from '../hooks/api'

interface GlobalContextType {
    isLogged: boolean
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
    user: IUser | null
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
    loading: boolean
}
const defaultUser = {
    _id: '',
    fullName: '',
    username: '',
    imageId: '',
    avatar: '',
    token: '',
}
const INITIAL_STATE = {
    user: defaultUser,
    loading: false,
    isLogged: false,
    setUser: () => {},
    setIsLogged: () => {},
}
const Context = createContext<GlobalContextType>(INITIAL_STATE)
export const useGlobalContext = () => useContext(Context)

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)
    const checkIsAuthenticated = async () => {
        try {
            const response = await checkAuth()
            setIsLogged(true)
            setUser(response)
        } catch (error) {
            setIsLogged(false)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        checkIsAuthenticated()
    }, [])

    const value: GlobalContextType = {
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
    }
    return <Context.Provider value={value}>{children}</Context.Provider>
}
export default GlobalContextProvider
