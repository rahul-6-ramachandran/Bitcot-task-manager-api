import express from 'express'
import { getresetPasswordLink, getUserTokenForForgotPassword, registerUser, } from '../../controllers/auth/authcontoller.js'
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



//  -----  Reset Password Link -----
//  Method : GET
//  Endpoint : api/user/reset-passsword
//  Body : None
//  Params : token

router.get('/reset-password/:token', getresetPasswordLink)



//  -----  Reset Password -----
//  Method : PUT
//  Endpoint : api/user/reset-passsword
//  Body : Password
//  Params : token

router.get('/reset-password/:token', updatePassword )


export default router