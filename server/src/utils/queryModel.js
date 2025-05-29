
import { getUserById } from "../services/user/userService.js"
import { UserActions } from "./enum.js"

export const getLogBodyForTaskUpdate = async(body,req,task)=>{
    const {username , userId} = req.user

    let logBody = []
    let logObj = {
        action : UserActions.UPDATE_TASK,
        userId : userId,
        path : req.originalUrl
    }
    if(body?.assignedTo){
        const assignedUser = await getUserById(body?.assignedTo)
        logBody.push({
            ...logObj,
            description :  `${username} Assigned ${task?.title} to ${assignedUser?.username}`,
        })
    }

    if(body?.title){
        logBody.push({
            ...logObj,
            description :  `${username} changed ${task?.title} to ${body?.title}`,
        })
    }

    if(body?.status){
        logBody.push({
            ...logObj,
            description :  `${username} updated ${task?.title} to ${body?.status}`,
        })
    }

    if(body?.deadLine){
        logBody.push({
            ...logObj,
            description :  `${username} updated the due date of ${task?.title} to ${body?.deadLine}`,
        })
    }

    if(body?.priority){
        logBody.push({
            ...logObj,
            description :  `${username} marked ${task?.title} as ${body?.priority}`,
        })
    }

    return logBody
}