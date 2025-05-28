import Task from "../../models/task/taskModel.js"

export const createTask = async(body)=>{
    try{
        console.log(body)
    return await Task.create(body)
}catch(error){
    throw new Error(error)
}
}