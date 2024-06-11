import { getReceiverSocketId, io } from '../socket/socket.js'
import Conversation from './../models/conversation.model.js'
import Message from './../models/message.model.js'
// import { io } from './../socket/socket.js'

export const sendMessage = async (req, res) => {
    const { message } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user.userId
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
    })
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        })
    }

    const newMessage = await Message.create({ senderId, receiverId, message })
    if (newMessage) {
        conversation.messages.push(newMessage._id)
    }
    // socket io functionality will go here
    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    await conversation.save()
    res.status(201).json(newMessage)
}
export const getMessages = async (req, res) => {
    const { id: userToChatId } = req.params
    const senderId = req.user.userId

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] },
    }).populate('messages')
    if (!conversation) return res.status(200).json([])

    res.status(200).json(conversation.messages)
}
