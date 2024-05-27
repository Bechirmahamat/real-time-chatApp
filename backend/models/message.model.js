import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['sent', 'delivered', 'read'],
            default: 'sent',
        },
    },
    // createdAt ,updatedAt
    { timestamps: true }
)
// Index to ensure messages are ordered by creation date
messageSchema.index({ createdAt: 1 })

const Message = mongoose.model('Message', messageSchema)
export default Message
