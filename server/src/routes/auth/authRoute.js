import express from 'express'
import { registerUser } from '../../controllers/auth/authcontoller.js'
import { authenticateUser, validateUserSignin } from '../../utils/validators.js'

const router = express.Router()

//  -----  User Login,Signup -----
//  Method : POST
//  Endpoint : api/user/signin
//  Body : email,password
//  Params : None

router.post('/signin',validateUserSignin(), registerUser)

export default router