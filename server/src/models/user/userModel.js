import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email : {type: String , required:true , unique : true},
    password : {type : String, required : true},
    username : {type : String, required : false},
    resetToken : {type:String, required: false , default:''}
},
{timestamps : true}
)

const User =  mongoose.model('User',userSchema)
export default User