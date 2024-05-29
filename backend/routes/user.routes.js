import express from 'express'
import { getUsers, checkAuth } from '../controllers/userController.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/check-auth', checkAuth)

export default router
