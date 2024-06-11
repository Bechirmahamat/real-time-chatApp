export interface IUser {
    _id: string
    fullName: string
    username: string
    avatar: string
    imageId: string
    token: string
}
export interface IOnlineUsers {}
export interface GlobalContextType {
    isLogged: boolean
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
    user: IUser | null
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
    loading: boolean
}
export interface IMessage {
    _id: string
    senderId: string
    receiverId: string
    message: string
    status: string
    createdAt: string
    updatedAt: string
}
