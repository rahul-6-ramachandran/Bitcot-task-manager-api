import mongoose, { Types } from "mongoose";
import { Priority, Status } from "../../utils/enum.js";

const taskSchema = new mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String , default : "" , required : false},
    deadLine : {type : Date, required : true},
    priority : {type : String, default : Priority.HIGH ,enum: Object.values(Priority), required : true},
    status : {type : String , default : Status.NOT_STARTED , enum: Object.values(Status), required : false},
    createdBy : {type : Types.ObjectId ,ref : 'User', required : true},
    assignedTo : {type : Types.ObjectId ,ref : 'User', required : true}
},{timestamps : true})

const Task = mongoose.model('Task',taskSchema)
export default Task