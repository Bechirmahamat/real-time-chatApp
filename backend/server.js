import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import express from 'express'

import { connectToDB } from './db/connection.js'
import notFoundMiddleware from './middlewares/not-found.js'
import errorHandlerMiddleware from './middlewares/errorHandler.js'
import authRouter from './routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

// important middlewares
app.use(express.json())

// routes
app.use('/api/auth', authRouter)

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
