import express from 'express'
import { registerUser } from '../../controllers/authController/authcontoller.js'

const router = express.Router()

router.post('/signin',registerUser)

export default router