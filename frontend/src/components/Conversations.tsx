import { useSocketContext } from '../SocketContext'
import useConversation from '../zustand/useCreateConversatino'
import UserSkeleton from './UserSkeleton'

interface props {
    isLoading: boolean
    data: [
        {
            avatar: string

            fullName: string

            username: string

            _id: string
        }
    ]
}
interface Iuser {
    avatar: string

    fullName: string

    username: string

    _id: string
}
const Conversations = ({ isLoading, data }: props) => {
    if (isLoading) {
        return <UserSkeleton />
    }
    return (
        <div className='drawer-side pr-3'>
            <label
                htmlFor='my-drawer-2'
                aria-label='close sidebar'
                className='drawer-overlay'
            ></label>

            <ul className=' p-4 w-80 min-h-full bg-base-200 text-base-content '>
                {/* Sidebar content here */}
                <div className='my-2'>
                    <label className='input input-bordered flex items-center gap-2'>
                        <input
                            type='text'
                            className='grow'
                            placeholder='Search'
                        />
                        <kbd className='kbd kbd-sm'>⌘</kbd>
                        <kbd className='kbd kbd-sm'>K</kbd>
                    </label>
                </div>
                {data.map((user) => (
                    <li key={user._id}>
                        <Conversation user={user} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Conversation = ({ user }: { user: Iuser }) => {
    const { onlineUser } = useSocketContext()
    const { selectedConversation, setSelectedConversation } = useConversation()
    const isSelected = selectedConversation?._id === user._id
    const isOnline = onlineUser.includes(user._id)
    return (
        <button
            className={`cursor-pointer hover:bg-neutral flex flex-row gap-x-2 items-center w-full rounded-lg px-4 py-2 ${
                isSelected && 'bg-neutral'
            }`}
            onClick={() => setSelectedConversation(user)}
        >
            <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                <div className='w-12 rounded-full'>
                    <img
                        src={
                            user.avatar
                                ? user.avatar
                                : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                        }
                    />
                </div>
            </div>

            <p>{user.fullName}</p>
        </button>
    )
}
export default Conversations
