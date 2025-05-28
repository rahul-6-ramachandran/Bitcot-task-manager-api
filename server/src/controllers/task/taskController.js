
import { Types } from "mongoose"
import { createTask } from "../../services/task/taskService.js"


const createNewTask = async(req,res)=>{
    let {body} = req
    // console.log(body,"body")
    const {userId} = req.user

    body = {
        ...body,
        createdBy :userId,
        assignedTo : body?.assignedTo
    }

    const newTask = await createTask(body)
    if(!newTask){
        return res.status(500).json({error : "Cannot Add Task"})
    }

    return res.status(200).json({message:"Task Created Successfully"})

}


export {createNewTask}