import { hashUserPassword } from "../../../helpers/index.js"
import { createNewUser,getUserByEmail, loginUser } from "../../services/user/userService.js"

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

export { registerUser }