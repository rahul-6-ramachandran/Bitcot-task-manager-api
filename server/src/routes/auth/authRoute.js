import express from "express";
import {
  checkTokenForResetPassword,
  getUserTokenForForgotPassword,
  registerUser,
  updatePassword,
} from "../../controllers/auth/authcontoller.js";
import {
  validateEmail,
  validatePassword,
  validateUserSignin,
} from "../../utils/validators.js";

const router = express.Router();

//  -----  User Login,Signup -----
//  Method : POST
//  Endpoint : api/user/signin
//  Body : email,password
//  Params : None
router.post("/signin", validateUserSignin(), registerUser);


//  -----  Forgot Password -----
//  Method : POST
//  Endpoint : api/user/forgot-passsword
//  Body : email
//  Params : None
router.post(
  "/forgot-passsword",
  validateEmail(),
  getUserTokenForForgotPassword
);


//  -----  Reset Password Link -----
//  Method : GET
//  Endpoint : api/user/reset-passsword
//  Body : None
//  Params : token
router.get("/reset-password/:token", checkTokenForResetPassword);


//  -----  Update Password -----
//  Method : PUT
//  Endpoint : api/user/reset-passsword
//  Body : Password
//  Params : token
router.put("/reset-password/:token", validatePassword(), updatePassword);

export default router;
