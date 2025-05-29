import { getLogs } from "../../services/logs/logsService.js"

export const getUserLogs = async(req,res)=>{
    const {userId} = req.user
    
    const model = {
        userId : userId
    }
    const userLogs =  await getLogs(model)

    return res.status(200).json({
        status : 200,
        userLogs : userLogs
    })
}