import { useEffect } from 'react'
import { useSocketContext } from '../SocketContext'
import useConversation from '../zustand/useCreateConversatino'
import { IMessage } from '../types'

const useListenMessage = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()
    useEffect(() => {
        socket?.on('newMessage', (newMessage: IMessage) => {
            setMessages([...messages, newMessage])
        })
        return () => socket?.off('newMessage')
    }, [socket, setMessages, messages])
    return <div>useListenMessage</div>
}
export default useListenMessage
