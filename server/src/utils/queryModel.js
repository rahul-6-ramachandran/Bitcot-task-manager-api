
import { getUserById } from "../services/user/userService.js"
import { Priority, Status, UserActions } from "./enum.js"


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

// ElasticSearch Filter Queries
export const getFilteredQueryForTasks = async(body,userId)=>{
    try {
        const {filter,sort} = body
    let filterQuery = [
        { term: { createdBy: userId } },
    ]

    let sortQuery = []

    if(filter){
        if(filter?.priority && Object.values(Priority).includes(filter?.priority)){
            filterQuery.push({ term: { priority : filter?.priority } })
        }
    
        if(filter?.status && Object.values(Status).includes(filter?.status)){
            filterQuery =[
                ...filterQuery,
                { term: { 'status.keyword' : filter?.status } }
            ] 
        }
    
        if(filter?.deadLine && !isNaN(new Date(filter.deadLine))){
            const date = new Date(filter.deadLine)
            date.setHours(23,59,59,999)
    
            console.log(date.toISOString())
            filterQuery.push(
                {
                    range: {
                      deadLine: {
                        lte : date.toISOString()
                      }
                    }
                  }
                )
        }
    }

    if(sort){
        if(sort?.priority){
            sortQuery.push({priorityIndex : { order : "desc" }})
        }
        if(sort?.deadLine){
            sortQuery.push({deadLine : { order : "asc" }})
        }
        if(sort?.status){
            sortQuery.push({statusIndex : { order : "desc" }})
        }
       

    }
    
    return {filterQuery,sortQuery}
    } catch (error) {
        console.log(error)
    }
}