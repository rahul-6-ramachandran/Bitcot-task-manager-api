import { createNewUser, getExistingUser } from "../../services/user/userService.js"

// User Signup
const registerUser = async(req,res)=>{
    try {
        const {body} = req

        const isUserExist = await getExistingUser(body?.email)
        if(isUserExist){
            return res.status(409).json({error : "User Already Exist.!"})
        }

        const newUser = await createNewUser(body)
        if(newUser){
            return res.status(200).json("Registration Successful")
        }else{
            return res.status(500).json("Sorry, Something Went Wrong.! Please Try Again")
        }
    } catch (error) {
        
    }
}

export { registerUser }