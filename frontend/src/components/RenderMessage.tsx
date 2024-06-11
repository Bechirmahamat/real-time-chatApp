import { BsCheck2, BsCheck2All } from 'react-icons/bs'
import { useGlobalContext } from '../GlobalContext'
import useConversation from '../zustand/useCreateConversatino'
const RenderMessage = ({ reference }: { reference: any }) => {
    const { user } = useGlobalContext()
    const { selectedConversation, messages } = useConversation()
    return messages?.map((item: any, index) =>
        item.senderId === user?._id ? (
            <div
                key={item._id}
                className='chat chat-end'
                ref={index === messages.length - 1 ? reference : null}
            >
                <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                        <img
                            alt='Tailwind CSS chat bubble component'
                            src={user?.avatar}
                        />
                    </div>
                </div>
                <div className='chat-bubble'>
                    {item.message}
                    <div className='flex justify-between'>
                        <BsCheck2All color='' className='text-emerald-500 ' />
                        <time className='text-xs opacity-50'>12:46</time>
                    </div>
                </div>
            </div>
        ) : (
            <div
                key={item._id}
                className='chat chat-start'
                ref={index === messages.length - 1 ? reference : null}
            >
                <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                        <img
                            alt='Tailwind CSS chat bubble component'
                            src={selectedConversation.avatar}
                        />
                    </div>
                </div>
                <div className='chat-bubble '>
                    {item.message}
                    <div className='flex justify-between'>
                        <time className='text-xs opacity-50'>12:46</time>
                        <BsCheck2 color='' />
                    </div>
                </div>
            </div>
        )
    )
}
export default RenderMessage
