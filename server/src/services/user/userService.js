import User from "../../models/user/userModel.js"

const getExistingUser = async(email)=>{
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
        return user
    } catch (error) {
        throw new Error({error: error})
    }
}


export {getExistingUser,createNewUser}