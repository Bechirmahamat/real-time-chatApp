import { create } from 'zustand'
import { IMessage } from '../types'

interface user {
    _id: string
    fullName: string
    username: string
    avatar: string
}
interface IConversation {
    selectedConversation: user
    setSelectedConversation: (by: user) => void
    messages: IMessage[] | []
    setMessages: (by: IMessage[]) => void
}

const defaultUser = {
    _id: '',
    fullName: '',
    username: '',
    avatar: '',
}
const useConversation = create<IConversation>((set) => ({
    selectedConversation: defaultUser,
    setSelectedConversation: (selectedConversation) =>
        set({ selectedConversation }),
    messages: [],
    setMessages: (messages: any) => set({ messages }),
}))

export default useConversation
