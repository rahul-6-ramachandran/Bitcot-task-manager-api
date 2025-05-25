import { getExistingUser } from "../../services/user/userService.js"

const registerUser = async(req,res)=>{
    try {
        const {email,password} = req.body

        console.log(email,password)
        const isUserExist = await getExistingUser(email)


    } catch (error) {
        
    }
}

export { registerUser }