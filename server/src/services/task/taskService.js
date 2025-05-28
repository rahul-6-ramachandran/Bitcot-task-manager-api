import Task from "../../models/task/taskModel.js"

export const createTask = async(body)=>{
    try{

    return await Task.create(body)
}catch(error){
    throw new Error(error)
}
}