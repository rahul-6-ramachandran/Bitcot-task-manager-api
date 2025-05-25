import express from 'express'
import { registerUser } from '../../controllers/authController/authcontoller.js'
import { validateUser } from '../../utils/util.js'

const router = express.Router()

router.post('/signin',validateUser(),registerUser)

export default router