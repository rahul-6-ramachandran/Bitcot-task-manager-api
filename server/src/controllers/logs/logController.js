import { getLogs } from "../../services/logs/logsService.js"

export const getUserLogs = async(req,res)=>{
    const {userId} = req.user
    
    const model = {
        userId : userId
    }
    return await getLogs(model)
}