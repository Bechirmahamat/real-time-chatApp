import { useMutation, useQuery } from '@tanstack/react-query'
import { getConversation, getMessages, sendMessage } from './api'
export const useGetConversation = () => {
    return useQuery({
        queryKey: ['GET_CONVERSATION'],
        queryFn: getConversation,
    })
}
export const useGetMessage = (id: string) => {
    return useQuery({
        queryKey: ['GET_MESSAGES', id],
        queryFn: () => getMessages(id),
        enabled: !!id,
    })
}
export const useSendMessage = () => {
    return useMutation({
        mutationFn: sendMessage,
    })
}
