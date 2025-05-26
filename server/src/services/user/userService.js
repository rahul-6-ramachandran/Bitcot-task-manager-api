import User from "../../models/user/userModel.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../../../helpers/index.js"

const getUserByEmail = async(email)=>{
    try {
        const user = await User.findOne({email})
        return user

    } catch (error) {
        throw new Error({error: error})
    }
}

const createNewUser = async(body)=>{
    try {
        const user = await User.create(body)
        if(!user){
            throw new Error("Cannot Create User, Please Try again later.!")
        }
        return  generateToken(user)
    
    } catch (error) {
        throw new Error({error: error})
    }
}

const loginUser = async(plainPassword,userPayload)=>{
    try {
        const isValid = bcrypt.compare(plainPassword,userPayload?.password)
        if(!isValid){
            throw new Error("Password Incorrect")
        }
        return  generateToken(userPayload)

    } catch (error) {
        throw new Error({error: error})
    }
}


export {getUserByEmail,createNewUser,loginUser}