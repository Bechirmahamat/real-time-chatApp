export interface IUser {
    _id: string
    fullName: string
    username: string
    avatar: string
    imageId: string
    token: string
}
export interface GlobalContextType {
    isLogged: boolean
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
    user: IUser | null
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
    loading: boolean
}
