import express from 'express'
import { registerUser } from '../../controllers/authController/authcontoller.js'
import { validateUserSignin } from '../../utils/util.js'

const router = express.Router()

router.post('/signin',validateUserSignin(),registerUser)

export default router