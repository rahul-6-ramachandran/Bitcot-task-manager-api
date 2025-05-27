import { generateToken, hashUserPassword, sendPasswordResetMail } from "../../../helpers/index.js"
import User from "../../models/user/userModel.js"
import { createNewUser,getUserByEmail, loginUser, updateUserById } from "../../services/user/userService.js"

// User Signup
const registerUser = async(req,res)=>{

        let {body} = req
        let {email,password} = body
        let token
     
        const existingUser = await getUserByEmail(email)
  
        if(existingUser!==null){
            
            token = await loginUser(password,existingUser)
            return res.status(200).json({message: "Login Successfull", access_token : token})
        }
     

        const hashedPassword = await hashUserPassword(password)
      
        const username = email.substring(0, email.lastIndexOf("@"))
       
        body = {
            ...body,
            username : username,
            password : hashedPassword
        }
        
     
        token = await createNewUser(body)
        
        if(token){
            return res.status(200).json({message:"Registration Successful",access_token : token})
        }else{
            return res.status(500).json("Sorry, Something Went Wrong.! Please Try Again")
        }
}


const getUserTokenForForgotPassword = async(req,res)=>{
    const {email} = req.body
    const user = await getUserByEmail(email)
    if(!user){
        return res.status(404).json({message : "User Does Not Exist.!"})
    }
    const token = await generateToken(user)
    if(!token){
        return res.status(500).json({error : "Cannot Generate Token"})
    }
    
    const userResetToken = await updateUserById(user?._id,
        {
            resetToken : token
        },
    )

    if(!userResetToken){
        return res.status(500).json({error : "Something Went Wrong,Please Try Again Later.!"})
    }

    const sendMail = await sendPasswordResetMail(user?.email,token)

    if(sendMail){
        return res.status(200).json({message: "Reset Mail Sent"})
    }

}



export { registerUser , getUserTokenForForgotPassword}