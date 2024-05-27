import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
                default: [],
            },
        ],
    },
    { timestamps: true }
)
// Ensure we have an index to speed up queries involving participants
conversationSchema.index({ participants: 1 })
const Conversation = mongoose.model('Conversation', conversationSchema)
export default Conversation
