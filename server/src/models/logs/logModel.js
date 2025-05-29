import { model, Schema, Types } from "mongoose";


const logSchema = new Schema({
    action : {type : String, required : true},
    userId : {type : Types.ObjectId , ref : 'User' , required : true},
    description : { type : String , default : "" , required : false},
    path : { type : String , required : true }
}, {timestamps : true})

const Logs = model('Log', logSchema)
export default Logs