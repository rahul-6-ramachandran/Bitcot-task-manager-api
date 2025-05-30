import User from "../../models/user/userModel.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../../../helpers/index.js"

const getUserByEmail = async(email)=>{
    try {
        const user = await User.findOne({email})
        return user

    } catch (error) {
        throw error
    }
}

const createNewUser = async(body)=>{
    try {
        const user = await User.create(body)
        if(!user){
            const err = new Error("Cannot Create User, Please Try again later.!");
            err.statusCode = 500;
            throw err
        }
        return  generateToken(user)
    
    } catch (error) {
        throw error
    }
}

const loginUser = async(plainPassword,userPayload)=>{
    try {
        const isValid = await bcrypt.compare(plainPassword,userPayload?.password)
        if(!isValid){
            const err = new Error("Password Incorrect");
            err.statusCode = 401;
            throw err
        }
        return await generateToken(userPayload)

    } catch (error) {
        throw error
    }
}

const updateUserById = async(_id, model)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
            {_id : _id},
            model,
            {new : true}
        )
        return updatedUser
    } catch (error) {
        throw error
    }
}

export const getUserById = async(_id)=>{
   const user = await User.findById({_id})
   return  user
}

export const getAllUser = async()=>{
    return await User.find({})
}
export {getUserByEmail,createNewUser,loginUser, updateUserById}