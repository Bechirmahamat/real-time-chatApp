import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            require: [true, 'fullName is required'],
        },
        username: {
            type: String,
            required: [true, 'username is required'],
            unique: [true, 'username is taken already'],
            minLength: [4, 'username must be greater than 4 char'],
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        gender: {
            type: String,
            required: [true, 'gender is required'],
            enum: ['male', 'female'],
        },
        avatar: {
            type: String,
            default: '',
        },
        tokens: [{ type: String }],
    },
    { timestamps: true }
)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.createTOKEN = function () {
    return jwt.sign(
        { id: this._id, name: this.username },

        process.env.JWT_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.JWT_LIFE_TIME,
        }
    )
}

userSchema.methods.comparePWD = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}

const User = mongoose.model('User', userSchema)
export default User
