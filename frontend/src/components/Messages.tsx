import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../GlobalContext'
import useConversation from '../zustand/useCreateConversatino'

import TextareaAutosize from 'react-textarea-autosize'

import { MdSend } from 'react-icons/md'
import { useGetMessage, useSendMessage } from '../../hooks/queryAndMutation'

import { IMessage } from '../types'
import { useSocketContext } from '../SocketContext'
import RenderMessage from './RenderMessage'
const Messages = () => {
    const { socket } = useSocketContext()
    const { mutateAsync: sendMessageRequest, isPending } = useSendMessage()
    const { selectedConversation, messages, setMessages } = useConversation()

    const { user } = useGlobalContext()
    const {
        data: messagesData,
        isLoading,
        refetch,
    } = useGetMessage(selectedConversation._id)
    const [inputContent, setInputContent] = useState('')

    const chatContainerRef: RefObject<HTMLDivElement> = useRef(null)
    const lastMessageRef: RefObject<HTMLDivElement> = useRef(null)
    useEffect(() => {
        socket?.on('newMessage', (newMessage: IMessage) => {
            setMessages([...messages, newMessage])
        })

        return () => socket?.off('newMessage')
    }, [socket, messages])

    useEffect(() => {
        if (messagesData) setMessages(messagesData)
    }, [isLoading, messagesData])
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    const handleSubmit = useCallback(async () => {
        if (!inputContent) return
        const data = await sendMessageRequest({
            id: selectedConversation._id,
            message: inputContent.trim(),
        })
        if (data) {
            setMessages([...messages, data])
            // await refetch()
            setInputContent('')
        }
    }, [
        inputContent,
        messages,
        refetch,
        sendMessageRequest,
        selectedConversation._id,
    ])

    if (selectedConversation._id === '') {
        return (
            <div className='flex w-full h-screen flex-col justify-center items-center'>
                <p>Welcome {user?.fullName}</p>
                <p>Select chat to start messaging</p>
            </div>
        )
    }
    // console.log(messagesData)

    if (isLoading) {
        return <div>loading...</div>
    }
    return (
        <div className=' flex flex-col w-[90%] mx-auto lg:max-w-[600px] min-h-screen relative'>
            {/* messages  */}
            <div className='flex-1' ref={chatContainerRef}>
                <RenderMessage reference={lastMessageRef} />
            </div>
            <div className='sticky border-t border-neutral mt-3 items-center bottom-0 px-4 py-3 bg-base-100 flex gap-x-2 w-full'>
                <TextareaAutosize
                    maxRows={5}
                    minRows={1}
                    className='w-full bg-neutral border-none rounded-xl p-3 resize-none focus:border-none focus:outline-none overflow-hidden'
                    placeholder='Type your message...'
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className='btn btn-neutral rounded-full h-14 w-14'
                    disabled={isPending}
                >
                    {isPending ? (
                        <span className='loading-spinner loading'></span>
                    ) : (
                        <MdSend size={'24px'} />
                    )}
                </button>
            </div>
        </div>
    )
}

export default Messages
