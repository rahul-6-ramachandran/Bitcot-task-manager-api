import express from 'express'
import { getUserTokenForForgotPassword, registerUser } from '../../controllers/auth/authcontoller.js'
import { validateEmail, validateUserSignin } from '../../utils/validators.js'

const router = express.Router()

//  -----  User Login,Signup -----
//  Method : POST
//  Endpoint : api/user/signin
//  Body : email,password
//  Params : None

router.post('/signin',validateUserSignin(), registerUser)


//  -----  Forgot Password -----
//  Method : POST
//  Endpoint : api/user/forgot-passsword
//  Body : email
//  Params : None

router.post('/forgot-passsword',validateEmail(),getUserTokenForForgotPassword)



//  -----  Reset Password -----
//  Method : POST
//  Endpoint : api/user/reset-passsword
//  Body : email
//  Params : None

router.post('/reset-passsword/:id', resetPassword)


export default router