import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import express from 'express'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectToDB } from './db/connection.js'
import notFoundMiddleware from './middlewares/not-found.js'
import errorHandlerMiddleware from './middlewares/errorHandler.js'
import authRouter from './routes/authRoutes.js'
import messageRouter from './routes/message.route.js'
import userRouter from './routes/user.routes.js'
import { protectedRoute } from './middlewares/protectedRoute.js'

const app = express()
const PORT = process.env.PORT || 5000

// important middlewares
app.use(
    cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
        credentials: true,
    })
)
app.use(express.json())
app.use(cookieParser())

// public routes
app.use('/api/auth', authRouter)
// privates routes
app.use('/api/message', protectedRoute, messageRouter)
app.use('/api/users', protectedRoute, userRouter)

//setting appMiddleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
// start the app function
const startServer = async () => {
    try {
        await connectToDB(process.env.MONGO_URI)
        console.log('connect to DB')
        app.listen(PORT, () => {
            console.log('server is listen on port ' + PORT)
        })
    } catch (error) {
        console.log('Error', error)
    }
}

startServer()
