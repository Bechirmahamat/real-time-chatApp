import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
export const app = express()

export const server = http.createServer(app)
export const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
    },
})

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {}

io.on('connection', (socket) => {
    console.log('a user connected')

    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id
    // io.emit() is used to send event to all the connected user

    io.emit('getOnlineUsers', Object.keys(userSocketMap))
    socket.on('disconnected', () => {
        console.log('user disconnected:', socket.id)
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})
