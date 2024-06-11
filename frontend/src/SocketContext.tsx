import { createContext, useContext, useEffect, useState } from 'react'

import io from 'socket.io-client'
import { useGlobalContext } from './GlobalContext'
interface GlobalContextType {
    socket: any
    onlineUser: any | null
    setSocket: React.Dispatch<React.SetStateAction<any>>
    // setOnlineUser: React.Dispatch<React.SetStateAction<IOnlineUsers | null>>
}
const INITIAL_STATE = {
    socket: '',
    onlineUser: [],
    setSocket: () => {},
}

const Context = createContext<GlobalContextType>(INITIAL_STATE)
export const useSocketContext = () => useContext(Context)

export const SocketContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState<any>('')
    const [onlineUser, setOnlineUser] = useState([])
    const { user, isLogged } = useGlobalContext()
    const useOpenSocket = () => {
        const socket = io('http://localhost:5000', {
            query: {
                userId: user?._id,
            },
        })
        if (isLogged) {
            setSocket(socket)

            socket.on('getOnlineUsers', (users) => {
                setOnlineUser(users)
            })
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }
    console.log(onlineUser)

    useEffect(() => {
        useOpenSocket()
    }, [isLogged])
    const value: GlobalContextType = {
        socket,
        onlineUser,
        setSocket,
    }
    return <Context.Provider value={value}>{children}</Context.Provider>
}
